import { Test, TestingModule } from '@nestjs/testing';
import { UserZoneService } from './user_zone.service';

describe('UserZoneService', () => {
  let service: UserZoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserZoneService],
    }).compile();

    service = module.get<UserZoneService>(UserZoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
