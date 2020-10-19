import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import * as config from 'config'
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    JwtModule.register({
      secret: config.get('jwt.secret') || process.env.JWT_SECRET,
      signOptions: {
        expiresIn: config.get('jwt.expiresIn') || process.env.JWT_EXPIRES
      }
    }),
    PassportModule.register({ defaultStrategy: 'local' }),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
