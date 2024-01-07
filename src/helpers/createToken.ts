import jwt from 'jsonwebtoken'

const createToken = (payload: any) => {
  return jwt.sign(payload, process?.env?.SECRET_TOKEN ?? 'q02021905')
}

export default createToken
