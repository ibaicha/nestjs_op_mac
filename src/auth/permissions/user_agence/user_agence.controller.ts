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
import { UserAgenceService } from './user_agence.service';
import { AuthGuard } from '@nestjs/passport';

import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserAgenceDto, UpdateUserAgenceDto } from './dto/userAgence.dto';

@ApiTags('UserAgence')
@Controller('userAgences')
export class UserAgenceController {
  constructor(
    private readonly userAgenceService: UserAgenceService,
  ) {}

  @Get()
  getAll() {
    return this.userAgenceService.getAll();
  }

  @Get('/:id')
  get(
    @Param('id', ParseIntPipe) userAgenceId: number,
    createUserAgenceDto: CreateUserAgenceDto,
  ) {
    return this.userAgenceService.getOne(
      userAgenceId,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(
    @Body()
    createUserAgenceDto: CreateUserAgenceDto,
  ) {
    return this.userAgenceService.create(
      createUserAgenceDto,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe) userAgenceId: number,
    createUserAgenceDto: CreateUserAgenceDto,
    @Req() request: Request,
  ) {
    return this.userAgenceService.delete(
      userAgenceId,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) userAgenceId: number,
    @Body()
    updateUserAgenceDto: UpdateUserAgenceDto,
  ) {
    return this.userAgenceService.update(
      userAgenceId,
      updateUserAgenceDto,
    );
  }
}
