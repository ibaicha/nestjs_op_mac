import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { TypeUniteGrandeurService } from './type_unite_grandeur.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateTypeUniteGrandeurDto } from './dto/createTypeUniteGrandeur.dto';
import { UpdateTypeUniteGrandeurDto } from './dto/updateTypeUniteGrandeur.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('TypeUniteGrandeur')
@Controller('type_unite_grandeurs')
export class TypeUniteGrandeurController {
    constructor(private readonly typeUniteGrandeurService: TypeUniteGrandeurService) {}

    @Get()
    getAll() {
        return this.typeUniteGrandeurService.getAll();
    }

    @Get("/:id")
    get(@Param("id", ParseIntPipe) typeUniteGrandeurId : number, createTypeUniteGrandeurDto: CreateTypeUniteGrandeurDto) {
        return this.typeUniteGrandeurService.getOne(typeUniteGrandeurId); 
    }
   

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    create(@Body() createTypeUniteGrandeurDto: CreateTypeUniteGrandeurDto) {
        return this.typeUniteGrandeurService.create(createTypeUniteGrandeurDto);
        
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete("delete/:id")
    delete(@Param("id", ParseIntPipe) typeUniteGrandeurId : number, createTypeUniteGrandeurDto: CreateTypeUniteGrandeurDto, @Req() request : Request) {
        return this.typeUniteGrandeurService.delete(typeUniteGrandeurId); 
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put("update/:id")
    update(
        @Param("id", ParseIntPipe) typeUniteGrandeurId : number,
        @Body() updateTypeUniteGrandeurDto: UpdateTypeUniteGrandeurDto,
        ) {
        return this.typeUniteGrandeurService.update(typeUniteGrandeurId, updateTypeUniteGrandeurDto); 
    }
   
    
    
}

