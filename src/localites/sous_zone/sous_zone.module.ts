import { Module } from '@nestjs/common';
import { SousZoneController } from './sous_zone.controller';
import { SousZoneService } from './sous_zone.service';

@Module({
  controllers: [SousZoneController],
  providers: [SousZoneService]
})
export class SousZoneModule {}
