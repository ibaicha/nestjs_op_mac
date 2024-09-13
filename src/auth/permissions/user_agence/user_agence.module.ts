import { Module } from '@nestjs/common';
import { UserAgenceService } from './user_agence.service';
import { UserAgenceController } from './user_agence.controller';

@Module({
  providers: [UserAgenceService],
  controllers: [UserAgenceController],
})
export class UserAgenceModule {}
