import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { VehicleService } from './vehicle.service'
import { WebsocketGateway } from './websocket.gateway'
import { Vehicle } from './entities/vehicle.entity'

// @Controller('vehicle')
export class VehicleController {
  constructor(
    private readonly vehicleService: VehicleService,
    private readonly websocketGateway: WebsocketGateway,
  ) {}

  @Post('location')
  async saveVehicle(
    @Body() location: { latitude: number; longitude: number },
  ): Promise<void> {
    const locationData = await this.vehicleService.saveVehicleLocation(location)
  }

  @Patch(':trackingCode/location')
  async updateLocation(
    @Param('trackingCode') trackingCode: string,
    @Body('latitude') latitude: number,
    @Body('longitude') longitude: number,
    @Query('clientId') clientId: string,
  ): Promise<void> {
    const locationData = this.vehicleService.updateLocation(
      trackingCode,
      latitude,
      longitude,
    )

    this.websocketGateway.sendToClient(
      clientId,
      'vehicleLocation',
      locationData,
    )
  }
}
