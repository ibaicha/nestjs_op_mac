import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';

import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MouvementIntrantService } from './mouvement_intrant.service';
import {
  CreateMouvementIntrantDto,
  GetMouvementIntrantParamsDTO,
  IMouvementIntrant,
  UpdateMouvementIntrantDto,
} from './dto/mouvementIntrant.dto';
import { Prisma } from '@prisma/client';

@ApiTags('MouvementIntrant')
@Controller('mouvementIntrants')
//@Controller('mouvement-intrant')
export class MouvementIntrantController {
  constructor(
    private readonly mouvementIntrantService: MouvementIntrantService,
  ) {}
  
  @Get('/all')
  getAll() {
    return this.mouvementIntrantService.getAll();
  }

  @Get('/:id')
  get(
    @Param('id', ParseIntPipe) mouvementIntrantId: number,
    createMouvementIntrantDto: CreateMouvementIntrantDto,
  ) {
    return this.mouvementIntrantService.getOne(mouvementIntrantId);
  }

  @Get()
  async getAllMouvementIntrantWithFilters(
    @Query() params: GetMouvementIntrantParamsDTO,
  ): Promise<IMouvementIntrant[]> {
    return this.mouvementIntrantService.getAllMouvementIntrantWithFilters(
      params,
    );
  }

  /*
  @Get(
    '/anneeId/:anneeId/saisonId/:saisonId/chargeExploitationId/:chargeExploitationId/opId/:opId/fournisseurId/:fournisseurId',
  )
  getAllMouvementIntrantCampagneOpFournisseur(
    @Param('anneeId', ParseIntPipe) anneeId: number,
    @Param('saisonId', ParseIntPipe) saisonId: number,
    @Param('chargeExploitationId', ParseIntPipe) chargeExploitationId?: number,
    @Param('opId', ParseIntPipe) opId?: number,
    @Param('fournisseurId', ParseIntPipe) fournisseurId?: number,
  ) {
    return this.mouvementIntrantService.getAllMouvementIntrantCampagneOpFournisseur(
      anneeId,
      saisonId,
      chargeExploitationId,
      opId,
      fournisseurId,
    );
  }
  */

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createMouvementIntrantDto: CreateMouvementIntrantDto) {
    return this.mouvementIntrantService.create(createMouvementIntrantDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe) mouvementIntrantId: number,
    createMouvementIntrantDto: CreateMouvementIntrantDto,
    @Req() request: Request,
  ) {
    return this.mouvementIntrantService.delete(mouvementIntrantId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) mouvementIntrantId: number,
    @Body() updateMouvementIntrantDto: UpdateMouvementIntrantDto,
  ) {
    return this.mouvementIntrantService.update(
      mouvementIntrantId,
      updateMouvementIntrantDto,
    );
  }
}
