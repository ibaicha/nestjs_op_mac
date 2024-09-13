import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Req,
  } from '@nestjs/common';
  import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
  import { EntrepotService } from './entrepot.service';
  import { AuthGuard } from '@nestjs/passport';

  import { Request } from 'express';
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateEntrepotDto } from './dto/entrepot.dto';

  
  @ApiTags('Entrepot')
  @Controller('entrepots')
  export class EntrepotController {
    constructor(private readonly entrepotService: EntrepotService) {}
  
    @Get()
    getAll() {
      return this.entrepotService.getAll();
    }
  
    @Get('/:id')
    get(
      @Param('id', ParseIntPipe) entrepotId: number,
      createEntrepotDto: CreateEntrepotDto,
    ) {
      return this.entrepotService.getOne(entrepotId);
    }
  
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    create(@Body() createEntrepotDto: CreateEntrepotDto) {
      return this.entrepotService.create(createEntrepotDto);
    }
  
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete('delete/:id')
    delete(
      @Param('id', ParseIntPipe) entrepotId: number,
      createEntrepotDto: CreateEntrepotDto,
      @Req() request: Request,
    ) {
      return this.entrepotService.delete(entrepotId);
    }
  
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put('update/:id')
    update(
      @Param('id', ParseIntPipe) entrepotId: number,
      @Body() updateEntrepotDto: CreateEntrepotDto,
    ) {
      return this.entrepotService.update(entrepotId, updateEntrepotDto);
    }
  }
  
