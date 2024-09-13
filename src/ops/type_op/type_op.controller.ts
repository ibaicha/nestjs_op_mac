import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { TypeOpService } from './type_op.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateTypeOpDto } from './dto/createTypeOp.dto';
import { UpdateTypeOpDto } from './dto/updateTypeOp.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('TypeOp')
@Controller('type-ops')
export class TypeOpController {
    constructor(private readonly typeOpService: TypeOpService) {}

    @Get()
    getAll() {
        return this.typeOpService.getAll();
    }

    @Get("/:id")
    get(@Param("id", ParseIntPipe) typeOpId : number, createTypeOpDto: CreateTypeOpDto) {
        return this.typeOpService.getOne(typeOpId); 
    }
   

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    create(@Body() createTypeOpDto: CreateTypeOpDto) {
        return this.typeOpService.create(createTypeOpDto);
        
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete("delete/:id")
    delete(@Param("id", ParseIntPipe) typeOpId : number, createTypeOpDto: CreateTypeOpDto, @Req() request : Request) {
        return this.typeOpService.delete(typeOpId); 
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put("update/:id")
    update(
        @Param("id", ParseIntPipe) typeOpId : number,
        @Body() updateTypeOpDto: UpdateTypeOpDto,
        ) {
        return this.typeOpService.update(typeOpId, updateTypeOpDto); 
    }
   
    
    
}

