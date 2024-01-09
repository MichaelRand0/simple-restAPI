import { NextFunction, Request, Response } from 'express'
import User from '../models/User'
import UserService from '../services/user.service'

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { age, first_name, last_name, login, password } = req.body
    try {
      const newUser = await UserService.create({ login, age, first_name, last_name, password })
      return res.status(200).json(newUser)
    } catch (e: any) {
      next(e)
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const allUsers = await User.findAll()
      return res.status(200).json(allUsers)
    } catch (e) {
      next(e)
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const user = await UserService.getOne(id)
      return res.status(200).json(user)
    } catch (e: any) {
      next(e)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const newUser = req.body
    try {
      const updatedUser = await UserService.update(newUser)
      return res.status(200).json(updatedUser)
    } catch (e) {
      next(e)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const deletedUser = await UserService.delete(id)
      return res.status(200).json(deletedUser)
    } catch (e) {
      next(e)
    }
  }
}

export default new UserController()
