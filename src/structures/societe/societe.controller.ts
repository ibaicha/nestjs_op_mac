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

import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateSocieteDto, UpdateSocieteDto } from './dto/societe.dto';
import { SocieteService } from './societe.service';

@ApiTags('Societe')
@Controller('societes')
export class SocieteController {
  constructor(private readonly societeService: SocieteService) {}

  @Get()
  getAll() {
    return this.societeService.getAll();
  }

  @Get('/:id')
  get(
    @Param('id', ParseIntPipe) societeId: number,
    createSocieteDto: CreateSocieteDto,
  ) {
    return this.societeService.getOne(societeId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createSocieteDto: CreateSocieteDto) {
    return this.societeService.create(createSocieteDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe) societeId: number,
    createSocieteDto: CreateSocieteDto,
    @Req() request: Request,
  ) {
    return this.societeService.delete(societeId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) societeId: number,
    @Body() updateSocieteDto: UpdateSocieteDto,
  ) {
    return this.societeService.update(societeId, updateSocieteDto);
  }
}
