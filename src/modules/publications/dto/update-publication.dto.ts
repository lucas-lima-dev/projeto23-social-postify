import { PartialType } from '@nestjs/mapped-types';
import { CreatePuplicationDto } from './create-publication.dto';

export class UpdatePublicationDto extends PartialType(CreatePuplicationDto) {}
