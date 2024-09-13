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
import { UniteGrandeurService } from './unite_grandeur.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUniteGrandeurDto, UpdateUniteGrandeurDto } from './dto/uniteGrandeur.dto';

import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('UniteGrandeur')
@Controller('unite_grandeurs')
export class UniteGrandeurController {
  constructor(private readonly uniteGrandeurService: UniteGrandeurService) {}

  @Get()
  getAll() {
    return this.uniteGrandeurService.getAll();
  }

  @Get('/:id')
  get(
    @Param('id', ParseIntPipe) uniteGrandeurId: number,
    createUniteGrandeurDto: CreateUniteGrandeurDto,
  ) {
    return this.uniteGrandeurService.getOne(uniteGrandeurId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createUniteGrandeurDto: CreateUniteGrandeurDto) {
    return this.uniteGrandeurService.create(createUniteGrandeurDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe) uniteGrandeurId: number,
    createUniteGrandeurDto: CreateUniteGrandeurDto,
    @Req() request: Request,
  ) {
    return this.uniteGrandeurService.delete(uniteGrandeurId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) uniteGrandeurId: number,
    @Body() updateUniteGrandeurDto: UpdateUniteGrandeurDto,
  ) {
    return this.uniteGrandeurService.update(
      uniteGrandeurId,
      updateUniteGrandeurDto,
    );
  }
}
