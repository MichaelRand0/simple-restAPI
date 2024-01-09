type HttpCode = 200 | 300 | 400 | 401 | 404 | 500

class AppError extends Error {
  public readonly name: string
  public readonly code: HttpCode
  constructor(name: string, message: string, httpCode: HttpCode) {
    super(message)
    this.name = name
    this.code = httpCode
  }
}

export default AppError
