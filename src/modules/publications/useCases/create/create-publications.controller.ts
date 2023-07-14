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
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('publications')
export class CreatePublicationsController {
  constructor(
    private readonly publicationsService: CreatePublicationsService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async addPublication(
    @Body() body: CreatePuplicationDto,
    @CurrentUser() currentUser: any,
  ): Promise<void> {
    try {
      await this.publicationsService.create(body, currentUser);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }
}
