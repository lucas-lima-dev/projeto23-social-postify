import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { FindPublicationsByUserService } from './findByUser-publication.service';

@Controller('publications')
export class FindPublicationsByUserController {
  constructor(
    private readonly findPublicationsByUserService: FindPublicationsByUserService,
  ) {}
  @UseGuards(AuthGuard)
  @Get()
  async getPublications(@CurrentUser() currentUser) {
    try {
      return this.findPublicationsByUserService.findByUser(currentUser);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }
}
