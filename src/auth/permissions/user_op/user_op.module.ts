import { Module } from '@nestjs/common';
import { UserOpController } from './user_op.controller';
import { UserOpService } from './user_op.service';

@Module({
  controllers: [UserOpController],
  providers: [UserOpService]
})
export class UserOpModule {}
