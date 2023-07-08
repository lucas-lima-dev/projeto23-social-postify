import { Module } from '@nestjs/common';
import { CreatePublicationsService } from './useCases/create/create-publications.service';
import { CreatePublicationsController } from './useCases/create/create-publications.controller';
import { PublicationRepository } from './repositories/publication.repository';
import { PrismaPublicationRepository } from './repositories/implementations/prisma-publications.repository';

@Module({
  controllers: [CreatePublicationsController],
  providers: [
    { provide: PublicationRepository, useClass: PrismaPublicationRepository },
    CreatePublicationsService,
  ],
})
export class PublicationsModule {}
