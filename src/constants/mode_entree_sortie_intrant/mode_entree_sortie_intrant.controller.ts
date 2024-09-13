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
import { CreateModeEntreeSortieIntrantDto } from './dto/createModeEntreeSortieIntrant.dto';
import { UpdateModeEntreeSortieIntrantDto } from './dto/updateModeEntreeSortieIntrant.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ModeEntreeSortieIntrantService } from './mode_entree_sortie_intrant.service';

@ApiTags('ModeEntreeSortieIntrant')
@Controller('modeEntreeSortieIntrants')
export class ModeEntreeSortieIntrantController {
  constructor(
    private readonly modeEntreeSortieIntrantService: ModeEntreeSortieIntrantService,
  ) {}

  @Get()
  getAll() {
    return this.modeEntreeSortieIntrantService.getAll();
  }

  @Get('/:id')
  get(
    @Param('id', ParseIntPipe) modeEntreeSortieIntrantId: number,
    createModeEntreeSortieIntrantDto: CreateModeEntreeSortieIntrantDto,
  ) {
    return this.modeEntreeSortieIntrantService.getOne(modeEntreeSortieIntrantId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(
    @Body() createModeEntreeSortieIntrantDto: CreateModeEntreeSortieIntrantDto,
  ) {
    return this.modeEntreeSortieIntrantService.create(
      createModeEntreeSortieIntrantDto,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe) modeEntreeSortieIntrantId: number,
    createModeEntreeSortieIntrantDto: CreateModeEntreeSortieIntrantDto,
    @Req() request: Request,
  ) {
    return this.modeEntreeSortieIntrantService.delete(modeEntreeSortieIntrantId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) modeEntreeSortieIntrantId: number,
    @Body() updateModeEntreeSortieIntrantDto: UpdateModeEntreeSortieIntrantDto,
  ) {
    return this.modeEntreeSortieIntrantService.update(
      modeEntreeSortieIntrantId,
      updateModeEntreeSortieIntrantDto,
    );
  }
}
