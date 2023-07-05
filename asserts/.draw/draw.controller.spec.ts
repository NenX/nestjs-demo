import { Test, TestingModule } from '@nestjs/testing';
import { DrawController } from './draw.controller';
import { DrawService } from './draw.service';

describe('UserController', () => {
  let controller: DrawController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrawController],
      providers: [DrawService],
    }).compile();

    controller = module.get<DrawController>(DrawController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
