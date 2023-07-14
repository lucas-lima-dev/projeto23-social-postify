import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { CreateUserService } from 'src/modules/users/useCases/create/create-user.service';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaUserRepository } from 'src/modules/users/repositories/implementations/prisma-user.repository';
import { UserRepository } from 'src/modules/users/repositories/user.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    AuthService,
    CreateUserService,
    PrismaService,
    PrismaUserRepository,
  ],
  exports: [AuthService],
})
export class AuthModule {}
