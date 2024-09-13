import { Module } from '@nestjs/common';
import { UniteTransformationController } from './unite_transformation.controller';
import { UniteTansformationService } from './unite_transformation.service';

@Module({
  controllers: [UniteTransformationController],
  providers: [UniteTansformationService]
})
export class UniteTransformationModule {}
