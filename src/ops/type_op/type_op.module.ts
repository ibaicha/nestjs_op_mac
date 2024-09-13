import { Module } from '@nestjs/common';
import { TypeOpController } from './type_op.controller';
import { TypeOpService } from './type_op.service';

@Module({
  controllers: [TypeOpController],
  providers: [TypeOpService]
})
export class TypeOpModule {}
