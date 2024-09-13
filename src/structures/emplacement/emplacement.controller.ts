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
import { EmplacementService } from './emplacement.service';
import { AuthGuard } from '@nestjs/passport';

import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateEmplacementDto, UpdateEmplacementDto } from './dto/emplacement.dto';

@ApiTags('Emplacement')
@Controller('emplacements')
export class EmplacementController {
  constructor(private readonly emplacementService: EmplacementService) {}

  @Get()
  getAll() {
    return this.emplacementService.getAll();
  }

  @Get('/:id')
  get(
    @Param('id', ParseIntPipe) emplacementId: number,
    createEmplacementDto: CreateEmplacementDto,
  ) {
    return this.emplacementService.getOne(emplacementId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createEmplacementDto: CreateEmplacementDto) {
    return this.emplacementService.create(createEmplacementDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe) emplacementId: number,
    createEmplacementDto: CreateEmplacementDto,
    @Req() request: Request,
  ) {
    return this.emplacementService.delete(emplacementId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) emplacementId: number,
    @Body() updateEmplacementDto: UpdateEmplacementDto,
  ) {
    return this.emplacementService.update(emplacementId, updateEmplacementDto);
  }
}
