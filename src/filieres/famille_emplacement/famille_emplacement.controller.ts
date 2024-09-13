import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { FamilleEmplacementService } from './famille_emplacement.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateFamilleEmplacementDto } from './dto/createFamilleEmplacement.dto';
import { UpdateFamilleEmplacementDto } from './dto/updateFamilleEmplacement.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('FamilleEmplacement')
@Controller('familleEmplacements')
export class FamilleEmplacementController {
    constructor(private readonly familleEmplacementService: FamilleEmplacementService) {}

    @Get()
    getAll() {
        return this.familleEmplacementService.getAll();
    }

    @Get("/:id")
    get(@Param("id", ParseIntPipe) familleEmplacementId : number, createFamilleEmplacementDto: CreateFamilleEmplacementDto) {
        return this.familleEmplacementService.getOne(familleEmplacementId); 
    }
   

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    create(@Body() createFamilleEmplacementDto: CreateFamilleEmplacementDto) {
        return this.familleEmplacementService.create(createFamilleEmplacementDto);
        
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete("delete/:id")
    delete(@Param("id", ParseIntPipe) familleEmplacementId : number, createFamilleEmplacementDto: CreateFamilleEmplacementDto, @Req() request : Request) {
        return this.familleEmplacementService.delete(familleEmplacementId); 
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put("update/:id")
    update(
        @Param("id", ParseIntPipe) familleEmplacementId : number,
        @Body() updateFamilleEmplacementDto: UpdateFamilleEmplacementDto,
        ) {
        return this.familleEmplacementService.update(familleEmplacementId, updateFamilleEmplacementDto); 
    }
   
    
    
}

