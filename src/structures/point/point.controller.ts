import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';

import { AuthGuard } from '@nestjs/passport';

import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PointService } from './point.service';
import { CreatePointDto, UpdatePointDto } from './dto/point.dto';


@ApiTags('Point')
@Controller('points')
export class PointController {
    constructor(private readonly pointService: PointService) {}

    @Get()
    getAll() {
        return this.pointService.getAll();
    }

    @Get("/:id")
    get(@Param("id", ParseIntPipe) pointId : number, createPointDto: CreatePointDto) {
        return this.pointService.getOne(pointId); 
    }
   

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    create(@Body() createPointDto: CreatePointDto) {
        return this.pointService.create(createPointDto);
        
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete("delete/:id")
    delete(@Param("id", ParseIntPipe) pointId : number, createPointDto: CreatePointDto, @Req() request : Request) {
        return this.pointService.delete(pointId); 
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put("update/:id")
    update(
        @Param("id", ParseIntPipe) pointId : number,
        @Body() updatePointDto: UpdatePointDto,
        ) {
        return this.pointService.update(pointId, updatePointDto); 
    }
   
    
    
}
