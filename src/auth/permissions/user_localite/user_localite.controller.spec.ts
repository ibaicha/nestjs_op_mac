import { Test, TestingModule } from '@nestjs/testing';
import { UserLocaliteController } from './user_localite.controller';

describe('UserLocaliteController', () => {
  let controller: UserLocaliteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserLocaliteController],
    }).compile();

    controller = module.get<UserLocaliteController>(UserLocaliteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
