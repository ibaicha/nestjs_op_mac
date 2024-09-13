import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTypeOpDto } from './dto/createTypeOp.dto';
import { UpdateTypeOpDto } from './dto/updateTypeOp.dto';

@Injectable()
export class TypeOpService {
    constructor(private readonly prismaService : PrismaService) {}

    async getAll() {
        return this.prismaService.typeOp.findMany();
    }

    async getOne(typeOpId: number) {
        const typeOp = await this.prismaService.typeOp.findUnique({where: {id: typeOpId}});
        if(!typeOp) throw new NotFoundException('Post not found');
        return typeOp;
    }
    async create(createTypeOpDto: CreateTypeOpDto) {
        const { name} = createTypeOpDto;
        await this.prismaService.typeOp.create({data : { name}});
        return {data : "TypeOp created"};
    }

    async update(typeOpId: number, updateTypeOpDto: UpdateTypeOpDto) {
        const typeOp = await this.prismaService.typeOp.findUnique({where: {id: typeOpId}});
        if(!typeOp) throw new NotFoundException('TypeOp not found');
        await this.prismaService.typeOp.update({where: {id: typeOpId}, data : {...updateTypeOpDto}});
        return {data : "TypeOp updeted!"};
    }

    async delete(typeOpId: number) {
        const typeOp = await this.prismaService.typeOp.findUnique({where: {id: typeOpId}});
        if(!typeOp) throw new NotFoundException('Post not found');
        await this.prismaService.typeOp.delete({where: {id: typeOpId}});
        return {data : "TypeOp deleted"};
    }
}

