import { Publication } from '@prisma/client';
import { CreatePuplicationDto } from '../dto/create-publication.dto';

export abstract class PublicationRepository {
  abstract create(data: CreatePuplicationDto): Promise<void>;
  abstract findAll(): Promise<Publication[]>;
  abstract findByUser(user_id: number): Promise<Publication[]>;
  abstract findById(id: number): Promise<Publication>;
  abstract findByTitle(title: string): Promise<Publication>;
}
