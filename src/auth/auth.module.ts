import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserService } from 'src/modules/users/useCases/create/create-user.service';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from 'src/modules/users/repositories/user.repository';
import { PrismaUserRepository } from 'src/modules/users/repositories/implementations/prisma-user.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    CreateUserService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
})
export class AuthModule {}
