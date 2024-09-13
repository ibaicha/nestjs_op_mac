import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTypeEmballageDto } from './dto/createTypeEmballage.dto';
import { UpdateTypeEmballageDto } from './dto/updateTypeEmballage.dto';

@Injectable()
export class TypeEmballageService {
    constructor(private readonly prismaService : PrismaService) {}

    async getAll() {
        return this.prismaService.typeEmballage.findMany();
    }

    async getOne(typeEmballageId: number) {
        const typeEmballage = await this.prismaService.typeEmballage.findUnique({where: {id: typeEmballageId}});
        if(!typeEmballage) throw new NotFoundException('Post not found');
        return typeEmballage;
    }
    async create(createTypeEmballageDto: CreateTypeEmballageDto) {
        const { name} = createTypeEmballageDto;
        await this.prismaService.typeEmballage.create({data : { name}});
        return {data : "TypeEmballage created"};
    }

    async update(typeEmballageId: number, updateTypeEmballageDto: UpdateTypeEmballageDto) {
        const typeEmballage = await this.prismaService.typeEmballage.findUnique({where: {id: typeEmballageId}});
        if(!typeEmballage) throw new NotFoundException('TypeEmballage not found');
        await this.prismaService.typeEmballage.update({where: {id: typeEmballageId}, data : {...updateTypeEmballageDto}});
        return {data : "TypeEmballage updeted!"};
    }

    async delete(typeEmballageId: number) {
        const typeEmballage = await this.prismaService.typeEmballage.findUnique({where: {id: typeEmballageId}});
        if(!typeEmballage) throw new NotFoundException('Post not found');
        await this.prismaService.typeEmballage.delete({where: {id: typeEmballageId}});
        return {data : "TypeEmballage deleted"};
    }
}

