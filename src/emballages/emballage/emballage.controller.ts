import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { EmballageService } from './emballage.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateEmballageDto } from './dto/createEmballage.dto';
import { UpdateEmballageDto } from './dto/updateEmballage.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('Emballage')
@Controller('emballages')
export class EmballageController {
    constructor(private readonly emballageService: EmballageService) {}

    @Get()
    getAll() {
        return this.emballageService.getAll();
    }

    @Get("/:id")
    get(@Param("id", ParseIntPipe) emballageId : number, createEmballageDto: CreateEmballageDto) {
        return this.emballageService.getOne(emballageId); 
    }
   

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    create(@Body() createEmballageDto: CreateEmballageDto) {
        return this.emballageService.create(createEmballageDto);
        
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete("delete/:id")
    delete(@Param("id", ParseIntPipe) emballageId : number, createEmballageDto: CreateEmballageDto, @Req() request : Request) {
        return this.emballageService.delete(emballageId); 
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put("update/:id")
    update(
        @Param("id", ParseIntPipe) emballageId : number,
        @Body() updateEmballageDto: UpdateEmballageDto,
        ) {
        return this.emballageService.update(emballageId, updateEmballageDto); 
    }
   
    
    
}

