import createToken from '../helpers/createToken'
import AppError from '../helpers/errorHandler/AppError'
import validatePassword from '../helpers/validatePassword'
import User from '../models/User'
import { LoginData } from '../types/Auth'
import IUser from '../types/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

class AuthService {
  async login(loginData: LoginData) {
    const { login, password } = loginData

    if (!login || !password) {
      throw new AppError('Auth error', 'login or password are empty', 400)
    }
    const user = await User.findOne({
      where: { login: login.toString() },
    })
    const isPasswordMatch = await bcrypt.compare(
      password.toString(),
      user?.dataValues.password ?? ''
    )
    if (!user) {
      throw new AppError('Auth error', 'User doesnt exists', 400)
    } else if (!isPasswordMatch) {
      throw new AppError('Auth error', 'Incorrect login or password', 400)
    }
    const token = createToken({ id: user.dataValues.id, roles: user.dataValues.roles })
    return token
  }

  async register(user: Omit<IUser, 'roles'>) {
    const { login, password, first_name, last_name, age } = user

    if (!login || !password) {
      throw new AppError('Register error', 'login or password are empty', 400)
    }
    if (!validatePassword(password)) {
      throw new AppError('Register error', 'Invalid password', 400)
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    const newUser = await User.create({
      login,
      first_name,
      last_name,
      age,
      password: hashPassword,
      roles: ['USER'],
    })
    const token = createToken({ id: newUser?.dataValues.id, roles: newUser?.dataValues.roles })
    return token
  }
}

export default new AuthService()
