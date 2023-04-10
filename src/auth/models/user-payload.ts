export interface UserPayload {
  sub: string | number
  id: string
  name_completed: string
  adress: string
  number_phone: string
  email: string
  iat?: number
  exp?: number
}
