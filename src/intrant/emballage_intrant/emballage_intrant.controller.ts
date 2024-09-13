

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';

import { AuthGuard } from '@nestjs/passport';

import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EmballageIntrantService } from './emballage_intrant.service';
import { CreateEmballageIntrantDto, UpdateEmballageIntrantDto } from './dto/emballageIntrant.dto';


@ApiTags('Emballage')
@Controller('emballages')
export class EmballageIntrantController {
    constructor(private readonly emballageIntrantService: EmballageIntrantService) {}

    @Get()
    getAll() {
        return this.emballageIntrantService.getAll();
    }

    @Get("/:id")
    get(@Param("id", ParseIntPipe) emballageId : number, createEmballageDto: CreateEmballageIntrantDto) {
        return this.emballageIntrantService.getOne(emballageId); 
    }
   

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    create(@Body() createEmballageIntrantDto: CreateEmballageIntrantDto) {
        return this.emballageIntrantService.create(createEmballageIntrantDto);
        
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete("delete/:id")
    delete(@Param("id", ParseIntPipe) emballageId : number, createEmballageIntrantDto: CreateEmballageIntrantDto, @Req() request : Request) {
        return this.emballageIntrantService.delete(emballageId); 
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put("update/:id")
    update(
        @Param("id", ParseIntPipe) emballageId : number,
        @Body() updateEmballageIntrantDto: UpdateEmballageIntrantDto,
        ) {
        return this.emballageIntrantService.update(emballageId, updateEmballageIntrantDto); 
    }
   
    
    
}

