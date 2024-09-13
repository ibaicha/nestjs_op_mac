import { Module } from '@nestjs/common';
import { TypeRemboursementController } from './type_remboursement.controller';
import { TypeRemboursementService } from './type_remboursement.service';

@Module({
  controllers: [TypeRemboursementController],
  providers: [TypeRemboursementService]
})
export class TypeRemboursementModule {}
