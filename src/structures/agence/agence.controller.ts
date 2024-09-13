import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthGuard } from '@nestjs/passport';

import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AgenceService } from './agence.service';
import { CreateAgenceDto, UpdateAgenceDto } from './dto/agence.dto';


@ApiTags('Agence')
@Controller('agences')
export class AgenceController {
    constructor(private readonly agenceService: AgenceService) {}

    @Get()
    getAll() {
        return this.agenceService.getAll();
    }

    @Get("/:id")
    get(@Param("id", ParseIntPipe) agenceAgenceId : number, createAgenceDto: CreateAgenceDto) {
        return this.agenceService.getOne(agenceAgenceId); 
    }
   

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    create(@Body() createAgenceDto: CreateAgenceDto) {
        return this.agenceService.create(createAgenceDto);
        
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete("delete/:id")
    delete(@Param("id", ParseIntPipe) agenceAgenceId : number, createAgenceDto: CreateAgenceDto, @Req() request : Request) {
        return this.agenceService.delete(agenceAgenceId); 
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put("update/:id")
    update(
        @Param("id", ParseIntPipe) agenceAgenceId : number,
        @Body() updateAgenceDto: UpdateAgenceDto,
        ) {
        return this.agenceService.update(agenceAgenceId, updateAgenceDto); 
    }
   
    
    
}


