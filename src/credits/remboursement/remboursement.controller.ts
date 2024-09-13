import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { RemboursementService } from './remboursement.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateRemboursementDto } from './dto/createRemboursement.dto';
import { UpdateRemboursementDto } from './dto/updateRemboursement.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('Remboursement')
@Controller('remboursements')
export class RemboursementController {
    constructor(private readonly remboursementService: RemboursementService) {}

    @Get()
    getAll() {
        return this.remboursementService.getAll();
    }

    
    @Get("/exploitationId/:id")
    getAllRemboursementsFromExploitation(@Param("id", ParseIntPipe) exploitationId : number) {
        return this.remboursementService.getAllRemboursementsFromExploitation(exploitationId);
    }

    @Get("/:id")
    get(@Param("id", ParseIntPipe) remboursementId : number, createRemboursementDto: CreateRemboursementDto) {
        return this.remboursementService.getOne(remboursementId); 
    }
   

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    create(@Body() createRemboursementDto: CreateRemboursementDto) {
        return this.remboursementService.create(createRemboursementDto);
        
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete("delete/:id")
    delete(@Param("id", ParseIntPipe) remboursementId : number, createRemboursementDto: CreateRemboursementDto, @Req() request : Request) {
        return this.remboursementService.delete(remboursementId); 
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put("update/:id")
    update(
        @Param("id", ParseIntPipe) remboursementId : number,
        @Body() updateRemboursementDto: UpdateRemboursementDto,
        ) {
        return this.remboursementService.update(remboursementId, updateRemboursementDto); 
    }
   
    
    
}

