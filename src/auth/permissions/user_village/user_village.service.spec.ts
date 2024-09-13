import { Test, TestingModule } from '@nestjs/testing';
import { UserVillageService } from './user_village.service';

describe('UserVillageService', () => {
  let service: UserVillageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserVillageService],
    }).compile();

    service = module.get<UserVillageService>(UserVillageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
