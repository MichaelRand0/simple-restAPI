import { NextFunction, Request, Response } from 'express'
import isErrorByRegexp from '../isErrorByRegexp'
import errorsList from './errorsList'
import getErrorCode from './getAppError'
import getAppError from './getAppError'

const ErrorHandler = (
  e: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Error Handler:', e)
  const status = e.code ?? e.httpCode ?? e.status ?? 500
  const message: string =
    e?.errors?.[0]?.message ??
    e?.message ??
    'Some error occured on the server, please try again'
  const name = e?.errors?.[0]?.type ?? e?.name ?? e?.type ?? 'Server error'
  const appError = Object.assign({}, getAppError(e))
  delete appError?.regexp
  // console.log('appError', appError)
  const errResponse = { status, message, name, ...appError }
  res.status(status).json(errResponse)
}

export default ErrorHandler
