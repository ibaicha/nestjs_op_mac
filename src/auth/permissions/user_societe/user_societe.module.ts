import { Module } from '@nestjs/common';
import { UserSocieteController } from './user_societe.controller';
import { UserSocieteService } from './user_societe.service';

@Module({
  controllers: [UserSocieteController],
  providers: [UserSocieteService],
})
export class UserSocieteModule {}
