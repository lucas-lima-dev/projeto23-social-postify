import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { PrismaUserRepository } from 'src/modules/users/repositories/implementations/prisma-user.repository';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaUserRepository,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;

    try {
      const token = authorization?.split(' ')[1];

      const data = await this.authService.checkToken(token);

      const user = await this.prisma.findById(Number(data.sub));
      request.user = user;
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }
}
