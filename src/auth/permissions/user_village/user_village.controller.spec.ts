import { Test, TestingModule } from '@nestjs/testing';
import { UserVillageController } from './user_village.controller';

describe('UserVillageController', () => {
  let controller: UserVillageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserVillageController],
    }).compile();

    controller = module.get<UserVillageController>(UserVillageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
