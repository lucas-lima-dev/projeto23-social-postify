import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '@prisma/client';

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

  @UseGuards(AuthGuard)
  @Get('me')
  async userLogged(@CurrentUser() user: User) {
    return user;
  }
}
