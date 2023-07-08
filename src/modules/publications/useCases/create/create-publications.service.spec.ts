import { Test, TestingModule } from '@nestjs/testing';
import { CreatePublicationsService } from './create-publications.service';

describe('PublicationsService', () => {
  let service: CreatePublicationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatePublicationsService],
    }).compile();

    service = module.get<CreatePublicationsService>(CreatePublicationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
