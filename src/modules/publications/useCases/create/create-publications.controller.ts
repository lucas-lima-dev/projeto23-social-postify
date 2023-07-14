import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreatePublicationsService } from './create-publications.service';
import { CreatePuplicationDto } from '../../dto/create-publication.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('publications')
export class CreatePublicationsController {
  constructor(
    private readonly publicationsService: CreatePublicationsService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async addPublication(@Body() body: CreatePuplicationDto): Promise<void> {
    try {
      await this.publicationsService.create(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }
}
