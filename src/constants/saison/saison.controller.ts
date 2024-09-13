import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { SaisonService } from './saison.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateSaisonDto } from './dto/createSaison.dto';
import { UpdateSaisonDto } from './dto/updateSaison.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('Saison')
@Controller('saisons')
export class SaisonController {
    constructor(private readonly saisonService: SaisonService) {}

    @Get()
    getAll() {
        return this.saisonService.getAll();
    }

    @Get("/:id")
    get(@Param("id", ParseIntPipe) saisonId : number, createSaisonDto: CreateSaisonDto) {
        return this.saisonService.getOne(saisonId); 
    }
   

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    create(@Body() createSaisonDto: CreateSaisonDto) {
        return this.saisonService.create(createSaisonDto);
        
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete("delete/:id")
    delete(@Param("id", ParseIntPipe) saisonId : number, createSaisonDto: CreateSaisonDto, @Req() request : Request) {
        return this.saisonService.delete(saisonId); 
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put("update/:id")
    update(
        @Param("id", ParseIntPipe) saisonId : number,
        @Body() updateSaisonDto: UpdateSaisonDto,
        ) {
        return this.saisonService.update(saisonId, updateSaisonDto); 
    }
   
    
    
}

