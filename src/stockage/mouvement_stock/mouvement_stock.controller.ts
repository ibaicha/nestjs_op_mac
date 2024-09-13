import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { MouvementStockService } from './mouvement_stock.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateMouvementStockDto } from './dto/createMouvementStock.dto';
import { UpdateMouvementStockDto } from './dto/updateMouvementStock.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('MouvementStock')
@Controller('mouvementStocks')
export class MouvementStockController {
    constructor(private readonly mouvementStockService: MouvementStockService) {}

    @Get()
    getAll() {
        return this.mouvementStockService.getAll();
    }
 

    @Get("/:id")
    get(@Param("id", ParseIntPipe) mouvementStockId : number, createMouvementStockDto: CreateMouvementStockDto) {
        return this.mouvementStockService.getOne(mouvementStockId); 
    }
   
    @Get("/produitId/:produitId/anneeId/:anneeId/saisonId/:saisonId")
    getAllMouvementStockProduitCampagne(@Param("produitId", ParseIntPipe) produitId : number, @Param("anneeId", ParseIntPipe) anneeId : number,@Param("saisonId", ParseIntPipe) saisonId : number) {
        return this.mouvementStockService.getAllMouvementStockProduitCampagne(produitId, anneeId, saisonId);
    }

    @Get("/opId/:opId/produitId/:produitId/anneeId/:anneeId/saisonId/:saisonId")
    getAllMouvementStockOpProduitCampagne(@Param("opId", ParseIntPipe) opId : number,@Param("produitId", ParseIntPipe) produitId : number, @Param("anneeId", ParseIntPipe) anneeId : number,@Param("saisonId", ParseIntPipe) saisonId : number) {
        return this.mouvementStockService.getAllMouvementStockOpProduitCampagne(opId,produitId, anneeId, saisonId);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    create(@Body() createMouvementStockDto: CreateMouvementStockDto) {
        return this.mouvementStockService.create(createMouvementStockDto);
        
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete("delete/:id")
    delete(@Param("id", ParseIntPipe) mouvementStockId : number, createMouvementStockDto: CreateMouvementStockDto, @Req() request : Request) {
        return this.mouvementStockService.delete(mouvementStockId); 
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put("update/:id")
    update(
        @Param("id", ParseIntPipe) mouvementStockId : number,
        @Body() updateMouvementStockDto: UpdateMouvementStockDto,
        ) {
        return this.mouvementStockService.update(mouvementStockId, updateMouvementStockDto); 
    }
   
    
    
}

