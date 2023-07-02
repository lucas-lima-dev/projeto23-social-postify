import { Module } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';
import { CreateUserController } from './useCases/create/create-user.controller';
import { UserRepository } from './repositories/user.repository';
import { PrismaUserRepository } from './repositories/implementations/prisma-user.repository';
import { CreateUserService } from './useCases/create/create-user.service';

@Module({
  controllers: [CreateUserController],
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    CreateUserService,
  ],
  exports: [UserRepository],
})
export class UsersModule {}
