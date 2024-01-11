import AppError from '../helpers/errorHandler/AppError'
import User from '../models/User'
import IUser from '../types/User'

class UserService {
  async getOne(id: string) {
    try {
      const newUser = await User.findByPk(id)
      return newUser
    } catch (e: any) {
      throw new AppError(e?.name, e?.message, e?.code)
    }
  }

  async update(data: IUser) {
    try {
      const updatedUser = await User.update(data, {
        where: { id: data.id },
        returning: true,
      })
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
