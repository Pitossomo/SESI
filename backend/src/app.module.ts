import { Module } from '@nestjs/common'
import { PrismaModule } from './modules/prisma/prisma.module'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'

import { VehicleModule } from './vehicle/vehicle.module'

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, VehicleModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
