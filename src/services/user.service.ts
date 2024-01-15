import { Role, Roles } from './../types/User'
import AppError from '../helpers/errorHandler/AppError'
import User from '../models/User'
import IUser from '../types/User'

class UserService {
  async getOne(id: string) {
    try {
      const newUser = await User.findByPk(id, {
        attributes: { exclude: ['refresh_token', 'password'] },
      })
      return newUser
    } catch (e: any) {
      throw new AppError(e?.name, e?.message, e?.code)
    }
  }

  async update(data: IUser) {
    try {
      const updatedUser = await User.update(
        { ...data, roles: undefined },
        {
          where: { id: data.id },
          returning: ['first_name', 'last_name', 'age', 'id', 'login', 'roles'],
        }
      )
      return updatedUser[1][0] ?? null
    } catch (e: any) {
      throw new AppError(e?.name, e?.message, e?.code)
    }
  }

  async updateByPk(data: IUser, id: number) {
    try {
      const updatedUser = await User.update(
        { ...data, roles: undefined, id },
        {
          where: { id },
          returning: ['first_name', 'last_name', 'age', 'id', 'login', 'roles'],
        }
      )
      return updatedUser[1][0] ?? null
    } catch (e: any) {
      throw new AppError(e?.name, e?.message, e?.code)
    }
  }

  async delete(id: string) {
    try {
      const deletedUser = await User.destroy({ where: { id } })
      // console.log('deletedUser', deletedUser)
      return deletedUser
        ? `User with id ${id} deleted`
        : `User with id ${id} doesnt exists`
    } catch (e: any) {
      throw new AppError(e?.name, e?.message, e?.code)
    }
  }

  async deleteByPk(id: string) {
    try {
      const deletedUser = await User.destroy({ where: { id } })
      // console.log('deletedUser', deletedUser)
      return deletedUser
        ? `User with id ${id} deleted`
        : `User with id ${id} doesnt exists`
    } catch (e: any) {
      throw new AppError(e?.name, e?.message, e?.code)
    }
  }
}

export default new UserService()
