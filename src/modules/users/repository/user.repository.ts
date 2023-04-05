import { PrismaService } from 'src/modules/prisma/prisma.service'

import * as bcrypt from 'bcrypt'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { User } from '../entities/user.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.user.findMany()
  }

  async findById(id: string) {
    return await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    })
  }

  async findByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    })
  }

  async create(createUserDto: CreateUserDto) {
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

  async update(id: string, UpdateUserDto: UpdateUserDto) {
    return await this.prismaService.user.update({
      data: UpdateUserDto,
      where: {
        id,
      },
    })
  }

  async delete(id: string): Promise<User> {
    return await this.prismaService.user.delete({
      where: {
        id,
      },
    })
  }
}
