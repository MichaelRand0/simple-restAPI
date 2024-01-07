import { NextFunction, Request, Response } from 'express'
import authService from '../services/auth.service'

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { login, password } = req.body
      const token = await authService.login({ login, password })
      return res.status(200).json(token)
    } catch (e: any) {
      next(e)
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const regResp = await authService.register(req.body)
      return res.status(200).json(regResp)
    } catch (e: any) {
      // console.log('ewer', e)
      next(e)
    }
  }
}

export default new AuthController()
