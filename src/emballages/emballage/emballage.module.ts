import { Module } from '@nestjs/common';
import { EmballageController } from './emballage.controller';
import { EmballageService } from './emballage.service';

@Module({
  controllers: [EmballageController],
  providers: [EmballageService]
})
export class EmballageModule {}
