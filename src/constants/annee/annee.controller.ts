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
import { AnneeService } from './annee.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateAnneeDto } from './dto/createAnnee.dto';
import { UpdateAnneeDto } from './dto/updateAnnee.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Annee')
@Controller('annees')
export class AnneeController {
  constructor(private readonly anneeService: AnneeService) {}

  @Get()
  getAll() {
    return this.anneeService.getAll();
  }

  @Get('/:id')
  get(
    @Param('id', ParseIntPipe) anneeId: number,
    createAnneeDto: CreateAnneeDto,
  ) {
    return this.anneeService.getOne(anneeId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createAnneeDto: CreateAnneeDto) {
    return this.anneeService.create(createAnneeDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe) anneeId: number,
    createAnneeDto: CreateAnneeDto,
    @Req() request: Request,
  ) {
    return this.anneeService.delete(anneeId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) anneeId: number,
    @Body() updateAnneeDto: UpdateAnneeDto,
  ) {
    return this.anneeService.update(anneeId, updateAnneeDto);
  }
}
