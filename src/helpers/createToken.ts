import jwt from 'jsonwebtoken'

const createToken = (payload: any, key: string, options: jwt.SignOptions) => {
  return jwt.sign(payload, key, options)
}

export default createToken
