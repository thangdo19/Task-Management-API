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

  async signUp(createDto: CreateDto) {
    const { id, username } = await this.usersService.createUser(createDto)
    return this.jwtService.sign({ id, username })
  }

  // signIn() {

  // }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByUsername(username);
    if (user && user.password === password) {
      // eslint-disable-next-line
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
