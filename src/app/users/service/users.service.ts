import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDto } from '../dto/create.dto';
import { UserRepository } from '../repository/user.repository';
import { User } from '../user.entity';
import * as bcrypt from 'bcrypt'

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

  async createUser(createDto: CreateDto): Promise<any> {
    createDto.password = await this.hashString(createDto.password)
    const user = this.userRepository.create(createDto)

    try {
      await user.save()
      // eslint-disable-next-line
      const { password, ...result } = user
      return result
    } 
    catch (error) {
      if (error.code === '23505') throw new ConflictException()
      else throw new BadRequestException()
    }
  }

  private async hashString(anyString: string): Promise<string> {
    return await bcrypt.hash(anyString, await bcrypt.genSalt())
  }
}
