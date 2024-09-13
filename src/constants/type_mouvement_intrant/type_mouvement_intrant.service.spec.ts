import { Test, TestingModule } from '@nestjs/testing';
import { TypeMouvementIntrantService } from './type_mouvement_intrant.service';

describe('TypeMouvementIntrantService', () => {
  let service: TypeMouvementIntrantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeMouvementIntrantService],
    }).compile();

    service = module.get<TypeMouvementIntrantService>(TypeMouvementIntrantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
