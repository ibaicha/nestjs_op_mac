import { Module } from '@nestjs/common';
import { UserSousZoneController } from './user_sous_zone.controller';
import { UserSousZoneService } from './user_sous_zone.service';

@Module({
  controllers: [UserSousZoneController],
  providers: [UserSousZoneService]
})
export class UserSousZoneModule {}
