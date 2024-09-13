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
import { CreditService } from './credit.service';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateCreditDto,
  CreateExploitationCreditDto,
  GetCreditParamsDTO,
  ICredit,
} from './dto/credit.dto';

import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Credit')
@Controller('credits')
export class CreditController {
  constructor(private readonly creditService: CreditService) {}

  @Get('/all')
  getAll() {
    return this.creditService.getAll();
  }


  @Get('/custom')
  getAllCustom() {
    return this.creditService.getAllCustom();
  }

  @Get('/exploitationId/:id')
  getAllCreditsFromExploitation(
    @Param('id', ParseIntPipe) exploitationId: number,
  ) {
    return this.creditService.getAllCreditsFromExploitation(exploitationId);
  }

  @Get('/custom/clientId/:id')
  getAllCustomCreditToOp(@Param('id', ParseIntPipe) opId: number) {
    return this.creditService.getAllCustomCreditToOp(opId);
  }

  @Get(
    '/custom/agenceEtablissementId/:agenceEtablissementId/produitId/:produitId/anneeId/:anneeId/saisonId/:saisonId',
  )
  getAllCustomCreditAgenceEtablissementVarieteAnneeSaison(
    @Param('agenceEtablissementId', ParseIntPipe) agenceEtablissementId: number,
    @Param('produitId', ParseIntPipe) produitId: number,
    @Param('anneeId', ParseIntPipe) anneeId: number,
    @Param('saisonId', ParseIntPipe) saisonId: number,
  ) {
    return this.creditService.getAllCustomCreditAgenceEtablissementVarieteAnneeSaison(
      agenceEtablissementId,
      produitId,
      anneeId,
      saisonId,
    );
  }

  @Get(
    '/custom/etablissementId/:etablissementId/produitId/:produitId/anneeId/:anneeId/saisonId/:saisonId',
  )
  getAllCustomCreditEtablissementVarieteAnneeSaison(
    @Param('etablissementId', ParseIntPipe) etablissementId: number,
    @Param('produitId', ParseIntPipe) produitId: number,
    @Param('anneeId', ParseIntPipe) anneeId: number,
    @Param('saisonId', ParseIntPipe) saisonId: number,
  ) {
    return this.creditService.getAllCustomCreditEtablissementVarieteAnneeSaison(
      etablissementId,
      produitId,
      anneeId,
      saisonId,
    );
  }

  @Get('/:id')
  get(
    @Param('id', ParseIntPipe) creditId: number,
    createCreditDto: CreateCreditDto,
  ) {
    return this.creditService.getOne(creditId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createCreditDto: CreateCreditDto) {
    return this.creditService.create(createCreditDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('createExploitationCredit')
  createExploitationCredit(
    @Body() createExploitationCreditDto: CreateExploitationCreditDto,
  ) {
    return this.creditService.createExploitationCredit(
      createExploitationCreditDto,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe) creditId: number,
    createCreditDto: CreateCreditDto,
    @Req() request: Request,
  ) {
    return this.creditService.delete(creditId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) creditId: number,
    @Body() updateCreditDto: CreateCreditDto,
  ) {
    return this.creditService.update(creditId, updateCreditDto);
  }
}
