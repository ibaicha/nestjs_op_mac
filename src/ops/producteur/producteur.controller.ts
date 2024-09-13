import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { ProducteurService } from './producteur.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateProducteurDto } from './dto/createProducteur.dto';
import { UpdateProducteurDto } from './dto/updateProducteur.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('Producteur')
@Controller('producteurs')
export class ProducteurController {
    constructor(private readonly producteurService: ProducteurService) {}

    @Get()
    getAll() {
        return this.producteurService.getAll();
    }

    @Get("/:id")
    get(@Param("id", ParseIntPipe) producteurId : number, createProducteurDto: CreateProducteurDto) {
        return this.producteurService.getOne(producteurId); 
    }
   

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    create(@Body() createProducteurDto: CreateProducteurDto) {
        return this.producteurService.create(createProducteurDto);
        
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete("delete/:id")
    delete(@Param("id", ParseIntPipe) producteurId : number, createProducteurDto: CreateProducteurDto, @Req() request : Request) {
        return this.producteurService.delete(producteurId); 
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put("update/:id")
    update(
        @Param("id", ParseIntPipe) producteurId : number,
        @Body() updateProducteurDto: UpdateProducteurDto,
        ) {
        return this.producteurService.update(producteurId, updateProducteurDto); 
    }
   
    
    
}
