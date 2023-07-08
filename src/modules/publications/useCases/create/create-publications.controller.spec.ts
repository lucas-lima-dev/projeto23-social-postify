import { Test, TestingModule } from '@nestjs/testing';
import { PublicationsController } from './create-publications.controller';
import { CreatePublicationsService } from './create-publications.service';

describe('PublicationsController', () => {
  let controller: PublicationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicationsController],
      providers: [CreatePublicationsService],
    }).compile();

    controller = module.get<PublicationsController>(PublicationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
