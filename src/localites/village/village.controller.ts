import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { VillageService } from './village.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateVillageDto } from './dto/createVillage.dto';
import { UpdateVillageDto } from './dto/updateVillage.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('Village')
@Controller('villages')
export class VillageController {
    constructor(private readonly villageService: VillageService) {}

    @Get()
    getAll() {
        return this.villageService.getAll();
    }

    @Get("/:id")
    get(@Param("id", ParseIntPipe) villageId : number, createVillageDto: CreateVillageDto) {
        return this.villageService.getOne(villageId); 
    }
   

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    create(@Body() createVillageDto: CreateVillageDto) {
        return this.villageService.create(createVillageDto);
        
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete("delete/:id")
    delete(@Param("id", ParseIntPipe) villageId : number, createVillageDto: CreateVillageDto, @Req() request : Request) {
        return this.villageService.delete(villageId); 
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put("update/:id")
    update(
        @Param("id", ParseIntPipe) villageId : number,
        @Body() updateVillageDto: UpdateVillageDto,
        ) {
        return this.villageService.update(villageId, updateVillageDto); 
    }
   
    
    
}
