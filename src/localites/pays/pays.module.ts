import { Module } from '@nestjs/common';
import { PaysController } from './pays.controller';
import { PaysService } from './pays.service';

@Module({
  controllers: [PaysController],
  providers: [PaysService]
})
export class PaysModule {}
