import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { SousZoneService } from './sous_zone.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateSousZoneDto } from './dto/createSousZone.dto';
import { UpdateSousZoneDto } from './dto/updateSousZone.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('SousZone')
@Controller('sous_zones')
export class SousZoneController {
    constructor(private readonly sousZoneService: SousZoneService) {}

    @Get()
    getAll() {
        return this.sousZoneService.getAll();
    }

    @Get("/:id")
    get(@Param("id", ParseIntPipe) sousZoneId : number, createSousZoneDto: CreateSousZoneDto) {
        return this.sousZoneService.getOne(sousZoneId); 
    }
   

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    create(@Body() createSousZoneDto: CreateSousZoneDto) {
        return this.sousZoneService.create(createSousZoneDto);
        
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete("delete/:id")
    delete(@Param("id", ParseIntPipe) sousZoneId : number, createSousZoneDto: CreateSousZoneDto, @Req() request : Request) {
        return this.sousZoneService.delete(sousZoneId); 
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put("update/:id")
    update(
        @Param("id", ParseIntPipe) sousZoneId : number,
        @Body() updateSousZoneDto: UpdateSousZoneDto,
        ) {
        return this.sousZoneService.update(sousZoneId, updateSousZoneDto); 
    }
   
    
    
}

