import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleDestroy, OnModuleInit
{
  onModuleInit() {
    this.$connect()
    console.log('Database connection has been established.')
  }
  async onModuleDestroy() {
    await this.$disconnect()
  }
}
