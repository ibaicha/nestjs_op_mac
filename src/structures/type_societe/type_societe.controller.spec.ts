import { Test, TestingModule } from '@nestjs/testing';
import { TypeSocieteController } from './type_societe.controller';

describe('TypeSocieteController', () => {
  let controller: TypeSocieteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeSocieteController],
    }).compile();

    controller = module.get<TypeSocieteController>(TypeSocieteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
