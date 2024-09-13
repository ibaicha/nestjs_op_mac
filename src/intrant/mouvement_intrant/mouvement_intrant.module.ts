import { Module } from '@nestjs/common';
import { MouvementIntrantController } from './mouvement_intrant.controller';
import { MouvementIntrantService } from './mouvement_intrant.service';

@Module({
  controllers: [MouvementIntrantController],
  providers: [MouvementIntrantService]
})
export class MouvementIntrantModule {}
