import { Test, TestingModule } from '@nestjs/testing';
import { PregnancyController } from './pregnancy.controller';
import { PregnancyService } from './pregnancy.service';

describe('PregnancyController', () => {
  let controller: PregnancyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PregnancyController],
      providers: [PregnancyService],
    }).compile();

    controller = module.get<PregnancyController>(PregnancyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
