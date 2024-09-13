import { Module } from '@nestjs/common';
import { LocaliteController } from './localite.controller';
import { LocaliteService } from './localite.service';

@Module({
  controllers: [LocaliteController],
  providers: [LocaliteService]
})
export class LocaliteModule {}
