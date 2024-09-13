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
import { UserSocieteService } from './user_societe.service';
import { CreateUserSocieteDto, UpdateUserSocieteDto } from './dto/userSociete.dto';

@ApiTags('UserSociete')
@Controller('userSocietes')
export class UserSocieteController {
  constructor(private readonly userSocieteService: UserSocieteService) {}

  @Get()
  getAll() {
    return this.userSocieteService.getAll();
  }

  @Get('/:id')
  get(
    @Param('id', ParseIntPipe) userSocieteId: number,
    createUserSocieteDto: CreateUserSocieteDto,
  ) {
    return this.userSocieteService.getOne(userSocieteId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createUserSocieteDto: CreateUserSocieteDto) {
    return this.userSocieteService.create(createUserSocieteDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe) userSocieteId: number,
    createUserSocieteDto: CreateUserSocieteDto,
    @Req() request: Request,
  ) {
    return this.userSocieteService.delete(userSocieteId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) userSocieteId: number,
    @Body() updateUserSocieteDto: UpdateUserSocieteDto,
  ) {
    return this.userSocieteService.update(
      userSocieteId,
      updateUserSocieteDto,
    );
  }
}
