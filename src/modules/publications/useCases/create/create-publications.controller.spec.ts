import { Test, TestingModule } from '@nestjs/testing';
import { CreatePublicationsController } from './create-publications.controller';
import { CreatePublicationsService } from './create-publications.service';

describe('PublicationsController', () => {
  let controller: CreatePublicationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreatePublicationsController],
      providers: [CreatePublicationsService],
    }).compile();

    controller = module.get<CreatePublicationsController>(
      CreatePublicationsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
