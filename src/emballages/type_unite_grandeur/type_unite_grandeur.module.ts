import { Module } from '@nestjs/common';
import { TypeUniteGrandeurController } from './type_unite_grandeur.controller';
import { TypeUniteGrandeurService } from './type_unite_grandeur.service';

@Module({
  controllers: [TypeUniteGrandeurController],
  providers: [TypeUniteGrandeurService]
})
export class TypeUniteGrandeurModule {}
