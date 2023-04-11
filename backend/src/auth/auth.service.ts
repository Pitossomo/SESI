import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/modules/users/users.service'
import * as bcrypt from 'bcrypt'
import { UnauthorizedError } from './errors/unauthorized.error'
import { User } from 'src/modules/users/entities/user.entity'
import { UserPayload } from './models/user-payload'
import { JwtService } from '@nestjs/jwt'
import { UserToken } from './models/user-token'
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

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

  login(user: User): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      date_of_birth: user.date_of_birth,
      address: user.address,
      email: user.email,
      name_completed: user.name_completed,
      number_phone: user.number_phone,
    }

    const jwtToken = this.jwtService.sign(payload)

    return {
      access_token: jwtToken,
      exp: +process.env.expirationTimeInSeconds,
    }
  }
}
