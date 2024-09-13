import { Module } from '@nestjs/common';
import { FamilleEmplacementController } from './famille_emplacement.controller';
import { FamilleEmplacementService } from './famille_emplacement.service';

@Module({
  controllers: [FamilleEmplacementController],
  providers: [FamilleEmplacementService]
})
export class FamilleEmplacementModule {}
