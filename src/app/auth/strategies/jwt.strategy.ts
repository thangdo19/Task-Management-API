import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt'
import * as config from 'config'
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtPayload } from '../jwt.payload';
import { UsersService } from 'src/app/users/service/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      secretOrKey: config.get('jwt.secret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate(payload: JwtPayload) {
    const { username } = payload
    const user = await this.usersService.getUserByUsername(username)

    if (!user) throw new NotFoundException()
    // eslint-disable-next-line
    const { password, ...partialUser } = user
    return partialUser
  }
}
