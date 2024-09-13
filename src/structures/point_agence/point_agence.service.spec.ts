import { Test, TestingModule } from '@nestjs/testing';
import { PointAgenceService } from './point_agence.service';

describe('PointAgenceService', () => {
  let service: PointAgenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PointAgenceService],
    }).compile();

    service = module.get<PointAgenceService>(PointAgenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
