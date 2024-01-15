import createToken from '../helpers/createToken'
import AppError from '../helpers/errorHandler/AppError'
import validatePassword from '../helpers/validatePassword'
import User from '../models/User'
import { LoginData } from '../types/Auth'
import IUser, { Role, Roles } from '../types/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userService from './user.service'

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
    const token = createToken(
      {
        id: user.dataValues.id,
        roles: user.dataValues.roles,
      },
      process?.env?.SECRET_KEY ?? '',
      { expiresIn: '1h' }
    )
    const refreshToken = createToken(
      {
        id: user?.dataValues.id,
      },
      process?.env?.SECRET_KEY_REFRESH ?? '',
      { expiresIn: '30d' }
    )
    await userService.update({
      ...user.dataValues,
      refresh_token: refreshToken,
    })
    return {
      token,
      refreshToken
    }
  }

  async register(user: Omit<IUser, 'roles'>, roles: Roles[Role]) {
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
      roles,
      refresh_token: '',
    })
    const token = createToken(
      {
        id: newUser?.dataValues.id,
        roles: newUser?.dataValues.roles,
      },
      process?.env?.SECRET_KEY ?? '',
      { expiresIn: '1h' }
    )
    const refreshToken = createToken(
      {
        id: newUser?.dataValues.id,
      },
      process?.env?.SECRET_KEY_REFRESH ?? '',
      { expiresIn: '30d' }
    )
    await userService.update({
      ...newUser.dataValues,
      refresh_token: refreshToken,
    })
    return {
      token,
      refreshToken,
    }
  }

  async createUser(user: Omit<IUser, 'roles'>) {
    return await this.register(user, ['USER'])
  }

  async createAdmin(user: Omit<IUser, 'roles'>) {
    return await this.register(user, ['USER', 'ADMIN'])
  }

  async refresh(refreshToken: string) {
    console.log('refreshToken', refreshToken)

    if (refreshToken) {
      const isTokenActual = jwt.verify(
        refreshToken,
        process?.env?.SECRET_KEY_REFRESH ?? ''
      )
      if (!isTokenActual) {
        throw new AppError(
          'refreshTokenExpired',
          'refresh token is expired',
          403
        )
      }
      const user = await User.findOne({
        where: {
          refresh_token: refreshToken,
        },
      })

      if (user) {
        const newAccessToken = createToken(
          { id: user.dataValues?.id, roles: user.dataValues?.roles },
          process?.env?.SECRET_KEY ?? '',
          { expiresIn: '1h' }
        )
        const newRefreshToken = createToken(
          { id: user.dataValues?.id },
          process?.env?.SECRET_KEY_REFRESH ?? '',
          { expiresIn: '30d' }
        )
        userService.update({
          ...user.dataValues,
          refresh_token: newRefreshToken,
        })
        return {
          token: newAccessToken,
          refreshToken: newRefreshToken,
        }
      }

      throw new AppError(
        'refreshTokenWrong',
        'user with this refresh token doesnt exists',
        403
      )
    }

    throw new AppError(
      'refreshTokenError',
      'refresh token must be provided',
      400
    )
  }
}

export default new AuthService()
