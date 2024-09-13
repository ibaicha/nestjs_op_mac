import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { ProfileService } from './profile.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateProfileDto } from './dto/createProfile.dto';
import { Request } from 'express';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Profile')
@Controller('profiles')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}


    @Get()
    getAll() {
        return this.profileService.getAll();
    }

    @Get("/:id")
    get(@Param("id", ParseIntPipe) profileId : number, createProfileDto: CreateProfileDto) {
        return this.profileService.getOne(profileId); 
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    create(@Body() createProfileDto: CreateProfileDto, @Req() request : Request) {
        return this.profileService.create(createProfileDto); 
    }
    
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete("delete/:id")
    delete(@Param("id", ParseIntPipe) profileId : number, createProfileDto: CreateProfileDto, @Req() request : Request) {
        return this.profileService.delete(profileId); 
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put("update/:id")
    update(
        @Param("id", ParseIntPipe) profileId : number,
        @Body() updateProfileDto: UpdateProfileDto,
        @Req() request : Request
        ) {
        const userId = request.user['userId'];
        return this.profileService.update(profileId, updateProfileDto); 
    }
}
