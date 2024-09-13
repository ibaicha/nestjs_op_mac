import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { TypeRemboursementService } from './type_remboursement.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateTypeRemboursementDto } from './dto/createTypeRemboursement.dto';
import { UpdateTypeRemboursementDto } from './dto/updateTypeRemboursement.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('TypeRemboursement')
@Controller('typeRemboursements')
export class TypeRemboursementController {
    constructor(private readonly typeRemboursementService: TypeRemboursementService) {}

    @Get()
    getAll() {
        return this.typeRemboursementService.getAll();
    }

    @Get("/:id")
    get(@Param("id", ParseIntPipe) typeRemboursementId : number, createTypeRemboursementDto: CreateTypeRemboursementDto) {
        return this.typeRemboursementService.getOne(typeRemboursementId); 
    }
   

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    create(@Body() createTypeRemboursementDto: CreateTypeRemboursementDto) {
        return this.typeRemboursementService.create(createTypeRemboursementDto);
        
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete("delete/:id")
    delete(@Param("id", ParseIntPipe) typeRemboursementId : number, createTypeRemboursementDto: CreateTypeRemboursementDto, @Req() request : Request) {
        return this.typeRemboursementService.delete(typeRemboursementId); 
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put("update/:id")
    update(
        @Param("id", ParseIntPipe) typeRemboursementId : number,
        @Body() updateTypeRemboursementDto: UpdateTypeRemboursementDto,
        ) {
        return this.typeRemboursementService.update(typeRemboursementId, updateTypeRemboursementDto); 
    }
   
    
    
}


