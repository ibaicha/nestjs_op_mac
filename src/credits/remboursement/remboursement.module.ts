import { Module } from '@nestjs/common';
import { RemboursementController } from './remboursement.controller';
import { RemboursementService } from './remboursement.service';

@Module({
  controllers: [RemboursementController],
  providers: [RemboursementService]
})
export class RemboursementModule {}
