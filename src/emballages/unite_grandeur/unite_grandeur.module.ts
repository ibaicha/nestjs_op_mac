import { Module } from '@nestjs/common';
import { UniteGrandeurController } from './unite_grandeur.controller';
import { UniteGrandeurService } from './unite_grandeur.service';

@Module({
  controllers: [UniteGrandeurController],
  providers: [UniteGrandeurService]
})
export class UniteGrandeurModule {}
