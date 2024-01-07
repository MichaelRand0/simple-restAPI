type HttpCode = 200 | 300 | 400 | 401 | 404 | 500

class AppError extends Error {
  public readonly name: string
  public readonly httpCode: HttpCode
  constructor(name: string, message: string, httpCode: HttpCode) {
    super(message)
    this.name = name
    this.httpCode = httpCode
  }

  static handleError(e: any) {
    const errors = {
      '22P02': {
        name: 'Type error',
        message: e?.message,
        code: 400,
      },
      '23505': {
        name: 'Unique value error',
        message: e?.message,
        code: 400,
      },
      'notNull Violation': {
        name: 'notNull Violation',
        message: e?.message,
        code: 400,
      },
      'Validation error': {
        name: 'Validation error',
        message: e?.message,
        code: 400,
      },
    }
    // console.log('error:', e)
    let resError = {
      name: e?.name ?? 'Server error',
      message: e?.message ?? 'Some error occured on server, please try again',
      code: e?.httpCode ?? 500,
    }
    const status =
      e?.code ?? e?.httpCode ?? e?.original?.code ?? e?.errors[0]?.type
    // console.log('error', e)
    resError = errors[status] ?? resError
    throw new AppError(resError.name, resError.message, resError.code)
  }
}

export default AppError
