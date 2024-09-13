import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IdentifiantService } from './identifiant.service';
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
  UseGuards,
} from '@nestjs/common';
import {
  CreateIdentifiantDto,
  GetIdentifiantParamsDTO,
  IIdentifiant,
  UpdateIdentifiantDto,
} from './dto/identifiant.dto';

@ApiTags('Identifiant')
@Controller('identifiants')
export class IdentifiantController {
  constructor(private readonly identifiantService: IdentifiantService) {}

  @Get('/all')
  getAll() {
    return this.identifiantService.getAll();
  }
  @Get()
  async getAllIdentifiantsWithFilters(
    @Query() params: GetIdentifiantParamsDTO,
  ): Promise<IIdentifiant[]> {
    return this.identifiantService.getAllIdentifiantsWithFilters(params);
  }

  @Get('/:id')
  get(
    @Param('id', ParseIntPipe) identifiantId: number,
    createIdentifiantDto: CreateIdentifiantDto,
  ) {
    return this.identifiantService.getOne(identifiantId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createIdentifiantDto: CreateIdentifiantDto) {
    return this.identifiantService.create(createIdentifiantDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe) identifiantId: number,
    createIdentifiantDto: CreateIdentifiantDto,
    @Req() request: Request,
  ) {
    return this.identifiantService.delete(identifiantId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) identifiantId: number,
    @Body() updateIdentifiantDto: UpdateIdentifiantDto,
  ) {
    return this.identifiantService.update(identifiantId, updateIdentifiantDto);
  }
}
