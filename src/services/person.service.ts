import AppError from '../helpers/errorHandler/AppError'
import Person from '../models/Person'
import IPerson from '../types/Person'

class PersonService {
  async create(data: IPerson) {
    const { first_name, last_name, age, login, password } = data
    try {
      const newUser = await Person.create({ login, first_name, last_name, age, password })
      return newUser
    } catch (e: any) {
      const { handleError } = AppError
      handleError(e)
    }
  }
  async getOne(id: string) {
    try {
      const newUser = await Person.findByPk(id)
      return newUser ? newUser : 'User doesnt exists'
    } catch (e: any) {
      const { handleError } = AppError
      handleError(e)
    }
  }

  async update(data: IPerson) {
    try {
      const updatedUser = await Person.update(data, {
        where: { id: data.id },
        returning: true,
      })
      return updatedUser[1][0]
    } catch (e: any) {
      const { handleError } = AppError
      handleError(e)
    }
  }

  async delete(id: string) {
    try {
      const deletedUser = await Person.destroy({ where: { id } })
      // console.log('deletedUser', deletedUser)
      return deletedUser ? `User with id ${id} deleted` : `User with id ${id} doesnt exists`
    } catch (e: any) {
      const { handleError } = AppError
      handleError(e)
    }
  }
}

export default new PersonService()
