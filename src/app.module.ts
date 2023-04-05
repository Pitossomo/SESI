import { Module } from '@nestjs/common'
import { PrismaModule } from './modules/prisma/prisma.module'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [PrismaModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
