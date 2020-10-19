import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDto } from '../dto/create.dto';
import { UserRepository } from '../repository/user.repository';
import { User } from '../user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  getUsers(): Promise<User[]> {
    return this.userRepository.find()
  }

  async getUserByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ where: { username } })
  }

  async createUser(createDto: CreateDto) {
    const user = this.userRepository.create(createDto)

    try {
      await user.save()
      return user
    } 
    catch (error) {
      throw new BadRequestException()
    }
  }
}
