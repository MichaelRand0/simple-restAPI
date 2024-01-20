import jwt from 'jsonwebtoken'
import AppError from '../helpers/errorHandler/AppError'
import { NextFunction, Request, Response } from 'express'
import { Role } from '../types/User'
import { DecodedToken } from '../types/Auth'
import decodeToken from '../helpers/decodeToken'
import roles from '../helpers/roles'

class AuthMiddleware {
  validate(role: Role) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.headers.authorization?.split(' ')[1] ?? ''
        const decodedToken: any = decodeToken(token)
        // console.log('decodedToken', decodedToken)
        const hasRights = roles?.[decodedToken?.role]?.includes(role)
        if(!hasRights) {
          throw new AppError('noPermissionsError', 'You dont have permissions to make this request', 403)
        }
        // console.log('hasRights', hasRights)
        next()
      } catch (e:any) {
        next(e)
      }
    }
  }
}

export default new AuthMiddleware()
