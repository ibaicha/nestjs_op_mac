import { Module } from '@nestjs/common';
import { UserVillageController } from './user_village.controller';
import { UserVillageService } from './user_village.service';

@Module({
  controllers: [UserVillageController],
  providers: [UserVillageService]
})
export class UserVillageModule {}
