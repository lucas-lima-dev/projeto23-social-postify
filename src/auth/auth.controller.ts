import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { AuthService } from './auth.service';
import { AuthSignUpDto } from './dto/auth-signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('sign-in')
  async signIn(@Body() body: AuthSignInDto) {
    return this.authService.signIn(body);
  }

  @Post('sign-up')
  async signUp(@Body() body: AuthSignUpDto) {
    return this.authService.signUp(body);
  }
}
