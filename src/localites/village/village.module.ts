import { Module } from '@nestjs/common';
import { VillageController } from './village.controller';
import { VillageService } from './village.service';

@Module({
  controllers: [VillageController],
  providers: [VillageService]
})
export class VillageModule {}
