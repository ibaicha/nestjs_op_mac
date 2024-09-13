import { Module } from '@nestjs/common';
import { MouvementStockService } from './mouvement_stock.service';
import { MouvementStockController } from './mouvement_stock.controller';


@Module({
  controllers: [MouvementStockController],
  providers: [MouvementStockService]
})
export class MouvementStockModule {}
