import { Module } from '@nestjs/common';
import { TypeMouvementStockController } from './type_mouvement_stock.controller';
import { TypeMouvementStockService } from './type_mouvement_stock.service';

@Module({
  controllers: [TypeMouvementStockController],
  providers: [TypeMouvementStockService]
})
export class TypeMouvementStockModule {}
