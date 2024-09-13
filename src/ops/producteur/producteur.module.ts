import { Module } from '@nestjs/common';
import { ProducteurController } from './producteur.controller';
import { ProducteurService } from './producteur.service';

@Module({
  controllers: [ProducteurController],
  providers: [ProducteurService]
})
export class ProducteurModule {}
