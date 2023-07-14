import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PublicationRepository } from '../../repositories/publication.repository';
import { CreatePuplicationDto } from '../../dto/create-publication.dto';
import { Publication } from '@prisma/client';

@Injectable()
export class CreatePublicationsService {
  constructor(private publicationRepository: PublicationRepository) {}

  async create(data: CreatePuplicationDto, currentUser): Promise<void> {
    const publicationAlreadyExists: Publication =
      await this.publicationRepository.findByTitle(data.title);

    if (publicationAlreadyExists) {
      throw new HttpException(
        'Publication already exists',
        HttpStatus.CONFLICT,
      );
    }
    const publicationData = {
      ...data,
      user_id: currentUser.id,
    };
    await this.publicationRepository.create(publicationData);
  }
}
