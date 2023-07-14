import { Module } from '@nestjs/common';

import { PrismaUserRepository } from './repositories/implementations/prisma-user.repository';
import { UserRepository } from './repositories/user.repository';
import { CreateUserController } from './useCases/create/create-user.controller';
import { CreateUserService } from './useCases/create/create-user.service';
import { PrismaModule } from 'src/database/prisma.module';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [CreateUserController],
  providers: [
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    CreateUserService,
    AuthService,
  ],
  exports: [CreateUserService, UserRepository],
})
export class UsersModule {}
