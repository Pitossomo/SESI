import { Module } from '@nestjs/common'
import { VehicleService } from './vehicle.service'
import { VehicleController } from './vehicle.controller'
import { VehicleGateway } from './vehicle.gateway'

@Module({
  controllers: [VehicleController],
  providers: [VehicleService, VehicleGateway],
})
export class VehicleModule {}
