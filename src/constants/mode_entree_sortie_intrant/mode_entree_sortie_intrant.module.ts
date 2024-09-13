import { Module } from '@nestjs/common';
import { ModeEntreeSortieIntrantService } from './mode_entree_sortie_intrant.service';
import { ModeEntreeSortieIntrantController } from './mode_entree_sortie_intrant.controller';

@Module({
  providers: [ModeEntreeSortieIntrantService],
  controllers: [ModeEntreeSortieIntrantController]
})
export class ModeEntreeSortieIntrantModule {}
