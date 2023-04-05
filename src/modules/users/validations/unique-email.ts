import { Injectable } from '@nestjs/common'
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { UserRepository } from '../repository/user.repository'

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmail implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepository) {}

  async validate(email: string) {
    const user = await this.userRepository.findByEmail(email)
    return !user
  }

  defaultMessage() {
    return 'Email já existe.'
  }
}
