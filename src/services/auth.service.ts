import createToken from '../helpers/createToken'
import AppError from '../helpers/errorHandler/AppError'
import validatePassword from '../helpers/validatePassword'
import Person from '../models/Person'
import { LoginData } from '../types/Auth'
import IPerson from '../types/Person'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

class AuthService {
  async login(loginData: LoginData) {
    const { login, password } = loginData
    try {
      if (!login || !password) {
        throw new AppError('Auth error', 'login or password are empty', 400)
      }
      const user = await Person.findOne({
        where: { login: login.toString() },
      })
      const isPasswordMatch = await bcrypt.compare(password.toString(), user?.dataValues.password ?? '')
      if (!user) {
        throw new AppError('Auth error', 'User doesnt exists', 400)
      } else if(!isPasswordMatch) {
        throw new AppError('Auth error', 'Incorrect login or password', 400)
      }
      const token = createToken({ id: user.dataValues.id })
      return token
    } catch (e) {
      const { handleError } = AppError
      handleError(e)
    }
  }

  async register(user: IPerson) {
    const { login, password, first_name, last_name, age } = user
    try {
      if (!login || !password) {
        throw new AppError('Register error', 'login or password are empty', 400)
      }
      if (!validatePassword(password)) {
        throw new AppError('Register error', 'Invalid password', 400)
      }
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)
      const newUser = await Person.create({
        login,
        first_name,
        last_name,
        age,
        password: hashPassword,
      })
      const token = createToken({ id: newUser.dataValues.id })
      return token
    } catch (e) {
      const { handleError } = AppError
      handleError(e)
    }
  }
}

export default new AuthService()
