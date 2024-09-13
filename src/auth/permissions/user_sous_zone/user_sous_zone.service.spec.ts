import { Test, TestingModule } from '@nestjs/testing';
import { UserSousZoneService } from './user_sous_zone.service';

describe('UserSousZoneService', () => {
  let service: UserSousZoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSousZoneService],
    }).compile();

    service = module.get<UserSousZoneService>(UserSousZoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
