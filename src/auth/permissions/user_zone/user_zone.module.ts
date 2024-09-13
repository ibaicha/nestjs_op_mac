import { Module } from '@nestjs/common';
import { UserZoneController } from './user_zone.controller';
import { UserZoneService } from './user_zone.service';

@Module({
  controllers: [UserZoneController],
  providers: [UserZoneService]
})
export class UserZoneModule {}
