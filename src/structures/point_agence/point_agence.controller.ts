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
import { PointAgenceService } from './point_agence.service';
import { CreatePointAgenceDto, UpdatePointAgenceDto } from './dto/point_agence.dto';
  
  @ApiTags('PointAgence')
  @Controller('pointAgences')
  export class PointAgenceController {
    constructor(
      private readonly pointAgenceService: PointAgenceService,
    ) {}
  
    @Get('/custom')
    getCustomAll() {
      return this.pointAgenceService.getCustomAll();
    }
  
    @Get('/custom/agenceFinancier/:id')
    getOpsFromAgenceFinancier(@Param('id', ParseIntPipe) agenceId: number) {
      return this.pointAgenceService.getOpsFromAgenceFinancier(
        agenceId,
      );
    }
  
    @Get()
    getAll() {
      return this.pointAgenceService.getAll();
    }
  
    @Get('/:id')
    get(
      @Param('id', ParseIntPipe)
      pointAgenceId: number,
      createPointAgenceDto: CreatePointAgenceDto,
    ) {
      return this.pointAgenceService.getOne(
        pointAgenceId,
      );
    }
  
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    create(
      @Body()
      createPointAgenceDto: CreatePointAgenceDto,
    ) {
      return this.pointAgenceService.create(
        createPointAgenceDto,
      );
    }
  
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete('delete/:id')
    delete(
      @Param('id', ParseIntPipe)
      pointAgenceId: number,
      createPointAgenceDto: CreatePointAgenceDto,
      @Req() request: Request,
    ) {
      return this.pointAgenceService.delete(
        pointAgenceId,
      );
    }
  
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put('update/:id')
    update(
      @Param('id', ParseIntPipe)
      pointAgenceId: number,
      @Body()
      updatePointAgenceDto: UpdatePointAgenceDto,
    ) {
      return this.pointAgenceService.update(
        pointAgenceId,
        updatePointAgenceDto,
      );
    }
  }
  
