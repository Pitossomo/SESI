import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserRepository } from './repository/user.repository'

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const userAlreadyExists = await this.userRepository.findByEmail(
      createUserDto.email,
    )

    if (userAlreadyExists) {
      throw new ConflictException('Email já existe no sistema.')
    }

    return await this.userRepository.create(createUserDto)
  }

  async findAll() {
    return await this.userRepository.findAll()
  }

  async findOne(id: string) {
    const user = await this.userExists(id)
    return user
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email)
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userExists(id)

    return await this.userRepository.update(id, updateUserDto)
  }

  async remove(id: string) {
    await this.userExists(id)

    return await this.userRepository.delete(id)
  }

  async userExists(id: string) {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new NotFoundException('usuário não encontrado.')
    }

    return user
  }
}
