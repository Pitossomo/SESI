import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/modules/prisma/prisma.service'
import { Vehicle } from './entities/vehicle.entity'

@Injectable()
export class VehicleService {
  constructor(private readonly prisma: PrismaService) {}

  async saveVehicle(): Promise<Vehicle> {}

  async getVehicleById(id: number): Promise<Vehicle> {
    return this.prisma.vehicle.findUnique({
      where: { id },
    })
  }

  async updateLocation(
    trackingCode: string,
    latitude: number,
    longitude: number,
  ): Promise<Vehicle> {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: {
        trackingCode,
      },
    })

    if (!vehicle) {
      throw new NotFoundException(
        `Veículo com código de rastreamento ${trackingCode} não encontrado.`,
      )
    }

    return this.prisma.vehicle.update({
      where: {
        trackingCode,
      },
      data: {
        latitude,
        longitude,
      },
    })
  }
}
