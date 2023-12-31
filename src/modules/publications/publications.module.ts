import { Module } from '@nestjs/common';
import { CreatePublicationsService } from './useCases/create/create-publications.service';
import { CreatePublicationsController } from './useCases/create/create-publications.controller';
import { PublicationRepository } from './repositories/publication.repository';
import { PrismaPublicationRepository } from './repositories/implementations/prisma-publications.repository';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserService } from '../users/useCases/create/create-user.service';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from '../users/repositories/user.repository';
import { PrismaUserRepository } from '../users/repositories/implementations/prisma-user.repository';
import { FindPublicationsByUserController } from './useCases/findByUser/findByUser-publication.controller';
import { FindPublicationsByUserService } from './useCases/findByUser/findByUser-publication.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [CreatePublicationsController, FindPublicationsByUserController],
  providers: [
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    { provide: PublicationRepository, useClass: PrismaPublicationRepository },
    CreatePublicationsService,
    FindPublicationsByUserService,
    AuthService,
    CreateUserService,
    PrismaUserRepository,
  ],
})
export class PublicationsModule {}
