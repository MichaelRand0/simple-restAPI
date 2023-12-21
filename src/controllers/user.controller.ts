import { Request, Response } from 'express'
import Person from '../model/Person'

class UserController {
  async create(req: Request, res: Response) {
    const { age, first_name, last_name } = req.body
    const newUser = await Person.create({ age, first_name, last_name })
    res.status(200).json(newUser)
  }

  async getAll(req: Request, res: Response) {
    const allUsers = await Person.findAll()
    res.status(200).json(allUsers)
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params
    const user = await Person.findByPk(id)
    res.status(200).json(user)
  }

  async update(req: Request, res: Response) {
    const newUser = req.body
    const updatedUser = await Person.update(newUser, {
      where: { id: newUser.id },
      returning: true,
    })
    res.status(200).json(updatedUser[1][0])
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    await Person.destroy({ where: { id } })
    res.status(200).json({ message: `User with id=${id} deleted`, id })
  }
}

export default new UserController()
