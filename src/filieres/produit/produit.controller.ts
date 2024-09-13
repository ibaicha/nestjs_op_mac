import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { ProduitService } from './produit.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateProduitDto } from './dto/createProduit.dto';
import { UpdateProduitDto } from './dto/updateProduit.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('Produit')
@Controller('produits')
export class ProduitController {
    constructor(private readonly produitService: ProduitService) {}

    @Get()
    getAll() {
        return this.produitService.getAll();
    }

    @Get("/:id")
    get(@Param("id", ParseIntPipe) produitId : number, createProduitDto: CreateProduitDto) {
        return this.produitService.getOne(produitId); 
    }
   

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    create(@Body() createProduitDto: CreateProduitDto) {
        return this.produitService.create(createProduitDto);
        
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete("delete/:id")
    delete(@Param("id", ParseIntPipe) produitId : number, createProduitDto: CreateProduitDto, @Req() request : Request) {
        return this.produitService.delete(produitId); 
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put("update/:id")
    update(
        @Param("id", ParseIntPipe) produitId : number,
        @Body() updateProduitDto: UpdateProduitDto,
        ) {
        return this.produitService.update(produitId, updateProduitDto); 
    }
   
    
    
}


