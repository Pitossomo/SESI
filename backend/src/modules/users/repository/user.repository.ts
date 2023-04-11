import { PrismaService } from 'src/modules/prisma/prisma.service'

import * as bcrypt from 'bcrypt'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { PartialUser } from '../entities/user.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<PartialUser[]> {
    return await this.prismaService.user.findMany({
      select: {
        address: true,
        date_of_birth: true,
        email: true,
        name_completed: true,
        id: true,
        number_phone: true,
        password: false,
      },
    })
  }

  async findById(id: string): Promise<PartialUser> {
    return await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
      select: {
        address: true,
        date_of_birth: true,
        email: true,
        name_completed: true,
        id: true,
        number_phone: true,
        password: false,
      },
    })
  }

  async findByEmail(email: string): Promise<PartialUser> {
    return await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    })
  }

  async create(createUserDto: CreateUserDto): Promise<PartialUser> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10)

    return await this.prismaService.user.create({
      data: createUserDto,
      select: {
        address: true,
        date_of_birth: true,
        email: true,
        name_completed: true,
        id: true,
        number_phone: true,
        password: false,
      },
    })
  }

  async update(id: string, UpdateUserDto: UpdateUserDto): Promise<PartialUser> {
    return await this.prismaService.user.update({
      data: UpdateUserDto,
      where: {
        id,
      },
      select: {
        address: true,
        date_of_birth: true,
        email: true,
        name_completed: true,
        id: true,
        number_phone: true,
        password: false,
      },
    })
  }

  async delete(id: string): Promise<PartialUser> {
    return await this.prismaService.user.delete({
      where: {
        id,
      },
      select: {
        address: true,
        date_of_birth: true,
        email: true,
        name_completed: true,
        id: true,
        number_phone: true,
        password: false,
      },
    })
  }
}
