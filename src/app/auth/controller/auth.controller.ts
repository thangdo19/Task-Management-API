import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateDto } from 'src/app/users/dto/create.dto';
import { User } from 'src/common/decorators/user.decorator';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Post('/signup')
  signUp(@Body() createDto: CreateDto) {
    return this.authService.signUp(createDto)
  }

  @UseGuards(AuthGuard('local'))
  @Post('/signin')
  signIn(@User() user) {
    return user
  }
}
