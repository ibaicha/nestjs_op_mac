import { Module } from '@nestjs/common';
import { IdentifiantService } from './identifiant.service';
import { IdentifiantController } from './identifiant.controller';

@Module({
  providers: [IdentifiantService],
  controllers: [IdentifiantController]
})
export class IdentifiantModule {}
