import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { LocalStategy } from './strategies/local.strategy'
import { UsersModule } from 'src/modules/users/users.module'

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStategy],
})
export class AuthModule {}
