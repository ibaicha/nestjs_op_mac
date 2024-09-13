import { Test, TestingModule } from '@nestjs/testing';
import { TypeSocieteService } from './type_societe.service';

describe('TypeSocieteService', () => {
  let service: TypeSocieteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeSocieteService],
    }).compile();

    service = module.get<TypeSocieteService>(TypeSocieteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
