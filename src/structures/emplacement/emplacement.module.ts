import { Module } from '@nestjs/common';
import { EmplacementController } from './emplacement.controller';
import { EmplacementService } from './emplacement.service';

@Module({
  controllers: [EmplacementController],
  providers: [EmplacementService]
})
export class EmplacementModule {}
