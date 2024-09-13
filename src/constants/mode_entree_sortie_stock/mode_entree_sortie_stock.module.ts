import { Module } from '@nestjs/common';
import { ModeEntreeSortieStockService } from './mode_entree_sortie_stock.service';
import { ModeEntreeSortieStockController } from './mode_entree_sortie_stock.controller';
 

@Module({
  controllers: [ModeEntreeSortieStockController],
  providers: [ModeEntreeSortieStockService]
})
export class ModeEntreeSortieStockModule {}
