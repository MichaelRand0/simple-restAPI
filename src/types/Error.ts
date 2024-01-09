type HttpCode = 200 | 300 | 400 | 401 | 404 | 500

export type AppErrorType = {
  name: string
  message: string
  code: HttpCode
}
