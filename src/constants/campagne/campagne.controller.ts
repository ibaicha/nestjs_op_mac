import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { CampagneService } from './campagne.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCampagneDto } from './dto/createCampagne.dto';
import { UpdateCampagneDto } from './dto/updateCampagne.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('Campagne')
@Controller('campagnes')
export class CampagneController {
    constructor(private readonly campagneService: CampagneService) {}

    @Get()
    getAll() {
        return this.campagneService.getAll();
    }

    @Get("/:id")
    get(@Param("id", ParseIntPipe) campagneId : number, createCampagneDto: CreateCampagneDto) {
        return this.campagneService.getOne(campagneId); 
    }
   

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    create(@Body() createCampagneDto: CreateCampagneDto) {
        return this.campagneService.create(createCampagneDto);
        
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete("delete/:id")
    delete(@Param("id", ParseIntPipe) campagneId : number, createCampagneDto: CreateCampagneDto, @Req() request : Request) {
        return this.campagneService.delete(campagneId); 
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put("update/:id")
    update(
        @Param("id", ParseIntPipe) campagneId : number,
        @Body() updateCampagneDto: UpdateCampagneDto,
        ) {
        return this.campagneService.update(campagneId, updateCampagneDto); 
    }
   
    
    
}


