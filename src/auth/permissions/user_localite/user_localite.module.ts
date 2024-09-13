import { Module } from '@nestjs/common';
import { UserLocaliteController } from './user_localite.controller';
import { UserLocaliteService } from './user_localite.service';

@Module({
  controllers: [UserLocaliteController],
  providers: [UserLocaliteService]
})
export class UserLocaliteModule {}
