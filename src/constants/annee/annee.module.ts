import { Module } from '@nestjs/common';
import { AnneeController } from './annee.controller';
import { AnneeService } from './annee.service';

@Module({
  controllers: [AnneeController],
  providers: [AnneeService]
})
export class AnneeModule {}
