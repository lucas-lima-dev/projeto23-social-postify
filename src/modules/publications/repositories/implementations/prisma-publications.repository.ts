import { Injectable } from '@nestjs/common';
import { PublicationRepository } from '../publication.repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreatePuplicationDto } from '../../dto/create-publication.dto';
import { Publication } from '@prisma/client';

@Injectable()
export class PrismaPublicationRepository implements PublicationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Publication): Promise<void> {
    await this.prisma.publication.create({ data });
  }

  async findAll(): Promise<Publication[]> {
    return await this.prisma.publication.findMany();
  }

  async findByUser(user_id: number): Promise<Publication[]> {
    return await this.prisma.publication.findMany({ where: { user_id } });
  }

  async findById(id: number): Promise<Publication> {
    return await this.prisma.publication.findUnique({ where: { id } });
  }

  async findByTitle(title: string): Promise<Publication> {
    return await this.prisma.publication.findFirst({ where: { title } });
  }
}
