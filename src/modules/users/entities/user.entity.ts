import { PartialType } from '@nestjs/mapped-types'

export class User {
  id: string
  name_completed: string
  email: string
  password: string
  date_of_birth: string
  address: string
  number_phone: string
}

export class UserDto extends PartialType(User) {}
