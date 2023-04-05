import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { UniqueEmail } from './validations/unique-email'
import { UserRepository } from './repository/user.repository'

@Module({
  controllers: [UsersController],
  providers: [UsersService, UniqueEmail, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}
