import jwt from 'jsonwebtoken'

const createToken = (payload: any) => {
  return jwt.sign(payload, process?.env?.SECRET_KEY ?? 'q02021905', {expiresIn: '2h'})
}

export default createToken
