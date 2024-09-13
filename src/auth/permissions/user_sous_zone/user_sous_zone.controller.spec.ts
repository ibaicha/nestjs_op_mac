import { Test, TestingModule } from '@nestjs/testing';
import { UserSousZoneController } from './user_sous_zone.controller';

describe('UserSousZoneController', () => {
  let controller: UserSousZoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserSousZoneController],
    }).compile();

    controller = module.get<UserSousZoneController>(UserSousZoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
