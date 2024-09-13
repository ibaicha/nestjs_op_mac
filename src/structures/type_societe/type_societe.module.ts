import { Module } from '@nestjs/common';
import { TypeSocieteController } from './type_societe.controller';
import { TypeSocieteService } from './type_societe.service';

@Module({
  controllers: [TypeSocieteController],
  providers: [TypeSocieteService]
})
export class TypeSocieteModule {}
