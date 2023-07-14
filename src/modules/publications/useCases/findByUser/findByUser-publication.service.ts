import { Injectable } from '@nestjs/common';
import { PublicationRepository } from '../../repositories/publication.repository';

@Injectable()
export class FindPublicationsByUserService {
  constructor(private publicationRepository: PublicationRepository) {}

  async findByUser(currentUser) {
    const user_id = currentUser.id;
    return await this.publicationRepository.findByUser(user_id);
  }
}
