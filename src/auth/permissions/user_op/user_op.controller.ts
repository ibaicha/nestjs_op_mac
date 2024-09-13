import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { UserOpService } from './user_op.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserOpDto } from './dto/createUserOp.dto';
import { UpdateUserOpDto } from './dto/updateUserOp.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('UserOp')
@Controller('userOps')
export class UserOpController {
    constructor(private readonly userOpService: UserOpService) {}

    @Get()
    getAll() {
        return this.userOpService.getAll();
    }

    @Get("/:id")
    get(@Param("id", ParseIntPipe) userOpId : number, createUserOpDto: CreateUserOpDto) {
        return this.userOpService.getOne(userOpId); 
    }
   

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    create(@Body() createUserOpDto: CreateUserOpDto) {
        return this.userOpService.create(createUserOpDto);
        
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete("delete/:id")
    delete(@Param("id", ParseIntPipe) userOpId : number, createUserOpDto: CreateUserOpDto, @Req() request : Request) {
        return this.userOpService.delete(userOpId); 
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put("update/:id")
    update(
        @Param("id", ParseIntPipe) userOpId : number,
        @Body() updateUserOpDto: UpdateUserOpDto,
        ) {
        return this.userOpService.update(userOpId, updateUserOpDto); 
    }
   
    
    
}

