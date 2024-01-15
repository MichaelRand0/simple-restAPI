import { NextFunction, Request, Response } from 'express'
import User from '../models/User'
import UserService from '../services/user.service'
import decodeToken from '../helpers/decodeToken'

class UserController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const allUsers = await User.findAll({attributes: {exclude: ['refresh_token', 'password']}})
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

  async updateByPk(req: Request, res: Response, next: NextFunction) {
    const {id} = req.params
    const newUser = req.body
    try {
      const updatedUser = await UserService.updateByPk(newUser, Number(id))
      return res.status(200).json(updatedUser)
    } catch (e) {
      next(e)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const token = req?.headers?.authorization?.split(' ')?.[1] ?? ''
    const decodedToken = decodeToken(token)
    try {
      const deletedUser = await UserService.delete(decodedToken?.id)
      return res.status(200).json(deletedUser)
    } catch (e) {
      next(e)
    }
  }

  async deleteByPk(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const deletedUser = await UserService.deleteByPk(id)
      return res.status(200).json(deletedUser)
    } catch (e) {
      next(e)
    }
  }
}

export default new UserController()
