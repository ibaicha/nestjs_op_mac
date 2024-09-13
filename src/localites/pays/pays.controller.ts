import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { PaysService } from './pays.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePaysDto } from './dto/createPays.dto';
import { UpdatePaysDto } from './dto/updatePays.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('Pays')
@Controller('pays')
export class PaysController {
    constructor(private readonly paysService: PaysService) {}

    @Get()
    getAll() {
        return this.paysService.getAll();
    }

    @Get("/:id")
    get(@Param("id", ParseIntPipe) paysId : number, createPaysDto: CreatePaysDto) {
        return this.paysService.getOne(paysId); 
    }
   

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    create(@Body() createPaysDto: CreatePaysDto) {
        return this.paysService.create(createPaysDto);
        
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete("delete/:id")
    delete(@Param("id", ParseIntPipe) paysId : number, createPaysDto: CreatePaysDto, @Req() request : Request) {
        return this.paysService.delete(paysId); 
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put("update/:id")
    update(
        @Param("id", ParseIntPipe) paysId : number,
        @Body() updatePaysDto: UpdatePaysDto,
        ) {
        return this.paysService.update(paysId, updatePaysDto); 
    }
   
    
    
}
