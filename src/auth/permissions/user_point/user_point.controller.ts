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
import { CreateUserPointDto, UpdateUserPointDto } from './dto/point.dto';
import { UserPointService } from './user_point.service';

@ApiTags('UserPoint')
@Controller('userPoints')
export class UserPointController {
  constructor(
    private readonly userPointService: UserPointService,
  ) {}

  @Get()
  getAll() {
    return this.userPointService.getAll();
  }

  @Get('/:id')
  get(
    @Param('id', ParseIntPipe) userPointId: number,
    createUserPointDto: CreateUserPointDto,
  ) {
    return this.userPointService.getOne(userPointId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createUserPointDto: CreateUserPointDto) {
    return this.userPointService.create(createUserPointDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe) userPointId: number,
    createUserPointDto: CreateUserPointDto,
    @Req() request: Request,
  ) {
    return this.userPointService.delete(userPointId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) userPointId: number,
    @Body() updateUserPointDto: UpdateUserPointDto,
  ) {
    return this.userPointService.update(
      userPointId,
      updateUserPointDto,
    );
  }
}
