import { Module } from '@nestjs/common';
import { TypeEmballageController } from './type_emballage.controller';
import { TypeEmballageService } from './type_emballage.service';

@Module({
  controllers: [TypeEmballageController],
  providers: [TypeEmballageService]
})
export class TypeEmballageModule {}
