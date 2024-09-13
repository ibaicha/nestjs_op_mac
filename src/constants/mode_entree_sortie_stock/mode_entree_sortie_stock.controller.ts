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

import { AuthGuard } from '@nestjs/passport';
import { CreateModeEntreeSortieStockDto } from './dto/createModeEntreeSortieStock.dto';
import { UpdateModeEntreeSortieStockDto } from './dto/updateModeEntreeSortieStock.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ModeEntreeSortieStockService } from './mode_entree_sortie_stock.service';

@ApiTags('ModeEntreeSortieStock')
@Controller('modeEntreeSortieStocks')
export class ModeEntreeSortieStockController {
  constructor(
    private readonly modeEntreeSortieStockService: ModeEntreeSortieStockService,
  ) {}

  @Get()
  getAll() {
    return this.modeEntreeSortieStockService.getAll();
  }

  @Get('/:id')
  get(
    @Param('id', ParseIntPipe) modeEntreeSortieStockId: number,
    createModeEntreeSortieStockDto: CreateModeEntreeSortieStockDto,
  ) {
    return this.modeEntreeSortieStockService.getOne(modeEntreeSortieStockId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(
    @Body() createModeEntreeSortieStockDto: CreateModeEntreeSortieStockDto,
  ) {
    return this.modeEntreeSortieStockService.create(
      createModeEntreeSortieStockDto,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe) modeEntreeSortieStockId: number,
    createModeEntreeSortieStockDto: CreateModeEntreeSortieStockDto,
    @Req() request: Request,
  ) {
    return this.modeEntreeSortieStockService.delete(modeEntreeSortieStockId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) modeEntreeSortieStockId: number,
    @Body() updateModeEntreeSortieStockDto: UpdateModeEntreeSortieStockDto,
  ) {
    return this.modeEntreeSortieStockService.update(
      modeEntreeSortieStockId,
      updateModeEntreeSortieStockDto,
    );
  }
}
