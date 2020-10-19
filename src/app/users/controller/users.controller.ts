import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateDto } from '../dto/create.dto';
import { UsersService } from '../service/users.service';
import { User } from '../user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers()
  }

  @Post()
  createUser(@Body() createDto: CreateDto) {
    return this.createUser(createDto)
  }
}
