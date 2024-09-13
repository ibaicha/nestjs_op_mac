import { Module } from '@nestjs/common';
import { UserPointController } from './user_point.controller';
import { UserPointService } from './user_point.service';

@Module({
  controllers: [UserPointController],
  providers: [UserPointService],
})
export class UserPointModule {}
