import { Module } from '@nestjs/common';
import { CampagneController } from './campagne.controller';
import { CampagneService } from './campagne.service';

@Module({
  controllers: [CampagneController],
  providers: [CampagneService],
})
export class CampagneModule {}
