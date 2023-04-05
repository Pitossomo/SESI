import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/modules/users/users.service'
import * as bcrypt from 'bcrypt'
import { UnauthorizedError } from './errors/unauthorized.error'
@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  login() {
    throw new Error('Method not implemented.')
  }
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email)

    if (!user) {
      throw new Error('Email ou senha incorretos.')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedError('Email ou senha incorretos.')
    }

    return {
      ...user,
      password: undefined,
    }
  }
}
