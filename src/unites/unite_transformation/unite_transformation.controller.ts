import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';

import { AuthGuard } from '@nestjs/passport';
import { CreateUniteTransformationDto } from './dto/createUniteTransformation.dto';
import { UpdateUniteTransformationDto } from './dto/updateUniteTransformation.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UniteTansformationService } from './unite_transformation.service';


@ApiTags('UniteTransformation')
@Controller('uniteTransformations')
export class UniteTransformationController {
    constructor(private readonly uniteTransformationService: UniteTansformationService) {}

    @Get()
    getAll() {
        return this.uniteTransformationService.getAll();
    }

    @Get("/:id")
    get(@Param("id", ParseIntPipe) uniteTransformationId : number, createUniteTransformationDto: CreateUniteTransformationDto) {
        return this.uniteTransformationService.getOne(uniteTransformationId); 
    }
   

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    create(@Body() createUniteTransformationDto: CreateUniteTransformationDto) {
        return this.uniteTransformationService.create(createUniteTransformationDto);
        
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete("delete/:id")
    delete(@Param("id", ParseIntPipe) uniteTransformationId : number, createUniteTransformationDto: CreateUniteTransformationDto, @Req() request : Request) {
        return this.uniteTransformationService.delete(uniteTransformationId); 
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put("update/:id")
    update(
        @Param("id", ParseIntPipe) uniteTransformationId : number,
        @Body() updateUniteTransformationDto: UpdateUniteTransformationDto,
        ) {
        return this.uniteTransformationService.update(uniteTransformationId, updateUniteTransformationDto); 
    }
   
    
    
}
