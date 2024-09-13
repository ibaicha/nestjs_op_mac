import { Module } from '@nestjs/common';
import { VarieteController } from './variete.controller';
import { VarieteService } from './variete.service';

@Module({
  controllers: [VarieteController],
  providers: [VarieteService]
})
export class VarieteModule {}
