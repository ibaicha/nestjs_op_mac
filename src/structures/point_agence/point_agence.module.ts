import { Module } from '@nestjs/common';
import { PointAgenceService } from './point_agence.service';
import { PointAgenceController } from './point_agence.controller';

@Module({
  controllers: [PointAgenceController],
  providers: [PointAgenceService]
})
export class PointAgenceModule {}
