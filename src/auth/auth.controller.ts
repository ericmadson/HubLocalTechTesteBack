import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signIn')
  async signIn(@Body() authUser: LoginUserDto) {
    return this.authService.login({
      email: authUser.email,
      password: authUser.password,
    });
  }
}
