import { Module } from '@nestjs/common';
import { EmballageIntrantController } from './emballage_intrant.controller';
import { EmballageIntrantService } from './emballage_intrant.service';

@Module({
  controllers: [EmballageIntrantController],
  providers: [EmballageIntrantService]
})
export class EmballageIntrantModule {}
