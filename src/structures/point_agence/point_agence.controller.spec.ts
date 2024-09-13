import { Test, TestingModule } from '@nestjs/testing';
import { PointAgenceController } from './point_agence.controller';

describe('PointAgenceController', () => {
  let controller: PointAgenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PointAgenceController],
    }).compile();

    controller = module.get<PointAgenceController>(PointAgenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
