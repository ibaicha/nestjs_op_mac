import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { TypeEmballageService } from './type_emballage.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateTypeEmballageDto } from './dto/createTypeEmballage.dto';
import { UpdateTypeEmballageDto } from './dto/updateTypeEmballage.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('TypeEmballage')
@Controller('type_emballages')
export class TypeEmballageController {
    constructor(private readonly typeEmballageService: TypeEmballageService) {}

    @Get()
    getAll() {
        return this.typeEmballageService.getAll();
    }

    @Get("/:id")
    get(@Param("id", ParseIntPipe) typeEmballageId : number, createTypeEmballageDto: CreateTypeEmballageDto) {
        return this.typeEmballageService.getOne(typeEmballageId); 
    }
   

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    create(@Body() createTypeEmballageDto: CreateTypeEmballageDto) {
        return this.typeEmballageService.create(createTypeEmballageDto);
        
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete("delete/:id")
    delete(@Param("id", ParseIntPipe) typeEmballageId : number, createTypeEmballageDto: CreateTypeEmballageDto, @Req() request : Request) {
        return this.typeEmballageService.delete(typeEmballageId); 
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put("update/:id")
    update(
        @Param("id", ParseIntPipe) typeEmballageId : number,
        @Body() updateTypeEmballageDto: UpdateTypeEmballageDto,
        ) {
        return this.typeEmballageService.update(typeEmballageId, updateTypeEmballageDto); 
    }
   
    
    
}


