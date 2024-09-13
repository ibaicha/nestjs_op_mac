import { Test, TestingModule } from '@nestjs/testing';
import { TypeMouvementIntrantController } from './type_mouvement_intrant.controller';

describe('TypeMouvementIntrantController', () => {
  let controller: TypeMouvementIntrantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeMouvementIntrantController],
    }).compile();

    controller = module.get<TypeMouvementIntrantController>(TypeMouvementIntrantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
