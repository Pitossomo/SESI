import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

import { validate } from 'class-validator'
import { LoginRequestBody } from 'src/auth/models/login-request'

@Injectable()
export class LoginValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body

    const loginRequestBody = new LoginRequestBody()
    loginRequestBody.email = email
    loginRequestBody.password = password

    const validations = await validate(loginRequestBody)

    if (validations.length) {
      throw new BadRequestException(
        validations.reduce((acc, curr) => {
          return [...acc, ...Object.values(curr.constraints)]
        }, []),
      )
    }

    next()
  }
}
