import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { RoleService } from './role.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateRoleDto } from './dto/createRole.dto';
import { Request } from 'express';
import { UpdateRoleDto } from './dto/updateRole.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('Role')
@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}


    @Get()
    getAll() {
        return this.roleService.getAll();
    }

    @Get("/:id")
    get(@Param("id", ParseIntPipe) roleId : number, createRoleDto: CreateRoleDto) {
        return this.roleService.getOne(roleId); 
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    create(@Body() createRoleDto: CreateRoleDto, @Req() request : Request) {
        return this.roleService.create(createRoleDto); 
    }
    
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete("delete/:id")
    delete(@Param("id", ParseIntPipe) roleId : number, createRoleDto: CreateRoleDto, @Req() request : Request) {
        return this.roleService.delete(roleId); 
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put("update/:id")
    update(
        @Param("id", ParseIntPipe) roleId : number,
        @Body() updateRoleDto: UpdateRoleDto,
        @Req() request : Request
        ) {
        const userId = request.user['userId'];
        return this.roleService.update(roleId, updateRoleDto); 
    }
}
