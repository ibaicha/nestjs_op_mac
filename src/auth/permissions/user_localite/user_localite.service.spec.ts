import { Test, TestingModule } from '@nestjs/testing';
import { UserLocaliteService } from './user_localite.service';

describe('UserLocaliteService', () => {
  let service: UserLocaliteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserLocaliteService],
    }).compile();

    service = module.get<UserLocaliteService>(UserLocaliteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
