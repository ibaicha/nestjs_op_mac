import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTypeSocieteDto, UpdateTypeSocieteDto } from './dto/typeSociete.dto';


@Injectable()
export class TypeSocieteService {
    constructor(private readonly prismaService : PrismaService) {}

    async getAll() {
        return this.prismaService.typeSociete.findMany();
    }

    async getOne(typeSocieteId: number) {
        const typeSociete = await this.prismaService.typeSociete.findUnique({where: {id: typeSocieteId}});
        if(!typeSociete) throw new NotFoundException('Post not found');
        return typeSociete;
    }
    async create(createTypeSocieteDto: CreateTypeSocieteDto) {
        const { name} = createTypeSocieteDto;
        await this.prismaService.typeSociete.create({data : { name}});
        return {data : "TypeSociete created"};
    }

    async update(typeSocieteId: number, updateTypeSocieteDto: UpdateTypeSocieteDto) {
        const typeSociete = await this.prismaService.typeSociete.findUnique({where: {id: typeSocieteId}});
        if(!typeSociete) throw new NotFoundException('TypeSociete not found');
        await this.prismaService.typeSociete.update({where: {id: typeSocieteId}, data : {...updateTypeSocieteDto}});
        return {data : "TypeSociete updeted!"};
    }

    async delete(typeSocieteId: number) {
        const typeSociete = await this.prismaService.typeSociete.findUnique({where: {id: typeSocieteId}});
        if(!typeSociete) throw new NotFoundException('Post not found');
        await this.prismaService.typeSociete.delete({where: {id: typeSocieteId}});
        return {data : "TypeSociete deleted"};
    }
}



