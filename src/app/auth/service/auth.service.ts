import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateDto } from 'src/app/users/dto/create.dto';
import { UsersService } from 'src/app/users/service/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  signUp(createDto: CreateDto) {
    return this.usersService.createUser(createDto)
  }

  // signIn() {

  // }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByUsername(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      console.log('password', password)
      console.log('result', result)
      return result;
    }
    return null;
  }
}
