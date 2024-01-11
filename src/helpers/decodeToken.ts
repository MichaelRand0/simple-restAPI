import jwt from 'jsonwebtoken'

const decodeToken = (token: string):any => {
  return jwt.verify(token, process?.env?.SECRET_KEY ?? '')
}

export default decodeToken
