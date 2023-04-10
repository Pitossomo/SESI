export interface UserToken {
  access_token: string
  exp: number
  user: User
}

interface User {
  id: string
  name_completed: string
  date_of_birth: string
  address: string
  number_phone: string
  email: string
}
