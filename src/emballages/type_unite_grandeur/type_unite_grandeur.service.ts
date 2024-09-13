import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTypeUniteGrandeurDto } from './dto/createTypeUniteGrandeur.dto';
import { UpdateTypeUniteGrandeurDto } from './dto/updateTypeUniteGrandeur.dto';

@Injectable()
export class TypeUniteGrandeurService {
    constructor(private readonly prismaService : PrismaService) {}

    async getAll() {
        return this.prismaService.typeUniteGrandeur.findMany();
    }

    async getOne(typeUniteGrandeurId: number) {
        const typeUniteGrandeur = await this.prismaService.typeUniteGrandeur.findUnique({where: {id: typeUniteGrandeurId}});
        if(!typeUniteGrandeur) throw new NotFoundException('Post not found');
        return typeUniteGrandeur;
    }
    async create(createTypeUniteGrandeurDto: CreateTypeUniteGrandeurDto) {
        const { name} = createTypeUniteGrandeurDto;
        await this.prismaService.typeUniteGrandeur.create({data : { name}});
        return {data : "TypeUniteGrandeur created"};
    }

    async update(typeUniteGrandeurId: number, updateTypeUniteGrandeurDto: UpdateTypeUniteGrandeurDto) {
        const typeUniteGrandeur = await this.prismaService.typeUniteGrandeur.findUnique({where: {id: typeUniteGrandeurId}});
        if(!typeUniteGrandeur) throw new NotFoundException('TypeUniteGrandeur not found');
        await this.prismaService.typeUniteGrandeur.update({where: {id: typeUniteGrandeurId}, data : {...updateTypeUniteGrandeurDto}});
        return {data : "TypeUniteGrandeur updeted!"};
    }

    async delete(typeUniteGrandeurId: number) {
        const typeUniteGrandeur = await this.prismaService.typeUniteGrandeur.findUnique({where: {id: typeUniteGrandeurId}});
        if(!typeUniteGrandeur) throw new NotFoundException('Post not found');
        await this.prismaService.typeUniteGrandeur.delete({where: {id: typeUniteGrandeurId}});
        return {data : "TypeUniteGrandeur deleted"};
    }
}

