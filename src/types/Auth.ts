import { Role } from "./User"

export type LoginData = {
    login: string
    password: string
}

export type DecodedToken = {
    id: number
    roles: Role[]
    iat: number
    exp: number
}