import jwt from 'jsonwebtoken'
import AppError from '../helpers/errorHandler/AppError'
import { NextFunction, Request, Response } from 'express'

class AuthMiddleware {
  validate() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.headers.authorization ?? ''
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY ?? '')
        console.log('decodedToken', decodedToken)
        return decodedToken
      } catch (e:any) {
        next(e)
      }
    }
  }
}

export default new AuthMiddleware()
