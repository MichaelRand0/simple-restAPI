import { NextFunction, Request, Response } from 'express'
import Person from '../models/Person'
import personService from '../services/person.service'

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { age, first_name, last_name } = req.body
    try {
      const newUser = await personService.create({ age, first_name, last_name })
      return res.status(200).json(newUser)
    } catch (e: any) {
      next(e)
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const allUsers = await Person.findAll()
      return res.status(200).json(allUsers)
    } catch (e) {
      next(e)
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const user = await personService.getOne(id)
      return res.status(200).json(user)
    } catch (e: any) {
      next(e)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const newUser = req.body
    try {
      const updatedUser = await personService.update(newUser)
      return res.status(200).json(updatedUser)
    } catch (e) {
      next(e)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const deletedUser = await personService.delete(id)
      return res.status(200).json(deletedUser)
    } catch (e) {
      next(e)
    }
  }
}

export default new UserController()
