import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaysDto } from './dto/createPays.dto';
import { UpdatePaysDto } from './dto/updatePays.dto';

@Injectable()
export class PaysService {
    constructor(private readonly prismaService : PrismaService) {}

    async getAll() {
        return this.prismaService.pays.findMany();
    }

    async getOne(paysId: number) {
        const pays = await this.prismaService.pays.findUnique({where: {id: paysId}});
        if(!pays) throw new NotFoundException('Post not found');
        return pays;
    }
    async create(createPaysDto: CreatePaysDto) {
        const { name,sigle} = createPaysDto;
        await this.prismaService.pays.create({data : { name, sigle}});
        return {data : "Pays created"};
    }

    async update(paysId: number, updatePaysDto: UpdatePaysDto) {
        const pays = await this.prismaService.pays.findUnique({where: {id: paysId}});
        if(!pays) throw new NotFoundException('Pays not found');
        await this.prismaService.pays.update({where: {id: paysId}, data : {...updatePaysDto}});
        return {data : "Pays updeted!"};
    }

    async delete(paysId: number) {
        const pays = await this.prismaService.pays.findUnique({where: {id: paysId}});
        if(!pays) throw new NotFoundException('Post not found');
        await this.prismaService.pays.delete({where: {id: paysId}});
        return {data : "Pays deleted"};
    }
}
