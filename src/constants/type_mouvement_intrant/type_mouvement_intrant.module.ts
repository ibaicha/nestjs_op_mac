import { Module } from '@nestjs/common';
import { TypeMouvementIntrantController } from './type_mouvement_intrant.controller';
import { TypeMouvementIntrantService } from './type_mouvement_intrant.service';

@Module({
  controllers: [TypeMouvementIntrantController],
  providers: [TypeMouvementIntrantService]
})
export class TypeMouvementIntrantModule {}
