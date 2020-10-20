import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateDto } from 'src/app/users/dto/create.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Post('/signup')
  @HttpCode(201)
  async signUp(@Body() createDto: CreateDto): Promise<any> {
    return {
      statusCode: 201,
      data: { token: await this.authService.signUp(createDto) }
    }
  }

  @Post('/signin')
  @UseGuards(AuthGuard('local'))
  @HttpCode(200)
  async signIn(@GetUser() partialUser: any) {
    return {
      statusCode: 200,
      data: { token: await this.authService.signIn(partialUser) }
    }
  }
}
