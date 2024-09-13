import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { FiliereService } from './filiere.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateFiliereDto } from './dto/createFiliere.dto';
import { UpdateFiliereDto } from './dto/updateFiliere.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('Filiere')
@Controller('filieres')
export class FiliereController {
    constructor(private readonly filiereService: FiliereService) {}

    @Get()
    getAll() {
        return this.filiereService.getAll();
    }

    @Get("/:id")
    get(@Param("id", ParseIntPipe) filiereId : number, createFiliereDto: CreateFiliereDto) {
        return this.filiereService.getOne(filiereId); 
    }
   

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    create(@Body() createFiliereDto: CreateFiliereDto) {
        return this.filiereService.create(createFiliereDto);
        
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete("delete/:id")
    delete(@Param("id", ParseIntPipe) filiereId : number, createFiliereDto: CreateFiliereDto, @Req() request : Request) {
        return this.filiereService.delete(filiereId); 
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put("update/:id")
    update(
        @Param("id", ParseIntPipe) filiereId : number,
        @Body() updateFiliereDto: UpdateFiliereDto,
        ) {
        return this.filiereService.update(filiereId, updateFiliereDto); 
    }
   
    
    
}

