import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { VarieteService } from './variete.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateVarieteDto } from './dto/createVariete.dto';
import { UpdateVarieteDto } from './dto/updateVariete.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('Variete')
@Controller('varietes')
export class VarieteController {
    constructor(private readonly varieteService: VarieteService) {}

    @Get()
    getAll() {
        return this.varieteService.getAll();
    }

    @Get("/:id")
    get(@Param("id", ParseIntPipe) varieteId : number, createVarieteDto: CreateVarieteDto) {
        return this.varieteService.getOne(varieteId); 
    }
   

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    create(@Body() createVarieteDto: CreateVarieteDto) {
        return this.varieteService.create(createVarieteDto);
        
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete("delete/:id")
    delete(@Param("id", ParseIntPipe) varieteId : number, createVarieteDto: CreateVarieteDto, @Req() request : Request) {
        return this.varieteService.delete(varieteId); 
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put("update/:id")
    update(
        @Param("id", ParseIntPipe) varieteId : number,
        @Body() updateVarieteDto: UpdateVarieteDto,
        ) {
        return this.varieteService.update(varieteId, updateVarieteDto); 
    }
   
    
    
}



