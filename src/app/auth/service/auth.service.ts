import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateDto } from 'src/app/users/dto/create.dto';
import { UsersService } from 'src/app/users/service/users.service';
import * as bcrypt from 'bcrypt'

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

  async signIn(partialUser: any) {
    const { id, username } = partialUser
    return this.jwtService.sign({ id, username })
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByUsername(username)
    
    if (user && await this.isValidPassword(password, user.password)) {
      // eslint-disable-next-line
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  private async isValidPassword(password: string, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(password, encrypted)
  }
}
