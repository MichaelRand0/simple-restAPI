
interface IPerson {
    login: string
    password: string
    refresh_token: string
    role: Role
    first_name?: string
    last_name?: string
    age?: number
    id?: number
}

export type Role = 'USER' | 'ADMIN'
export type Roles = Record<Role, Role[]>

export default IPerson