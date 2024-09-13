import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy.service';
import { RoleModule } from './role/role.module';
import { ProfileModule } from './profile/profile.module';
import { UserOpModule } from './permissions/user_op/user_op.module';
import { UserPointModule } from './permissions/user_point/user_point.module';
import { UserVillageModule } from './permissions/user_village/user_village.module';
import { UserLocaliteModule } from './permissions/user_localite/user_localite.module';
import { UserSousZoneModule } from './permissions/user_sous_zone/user_sous_zone.module';
import { UserZoneModule } from './permissions/user_zone/user_zone.module';
import { UserAgenceModule } from './permissions/user_agence/user_agence.module';
import { UserSocieteModule } from './permissions/user_societe/user_societe.module';

@Module({
  imports: [JwtModule.register({}), RoleModule, ProfileModule, UserOpModule, UserPointModule, UserVillageModule, UserLocaliteModule, UserSousZoneModule, UserZoneModule, UserAgenceModule, UserSocieteModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
