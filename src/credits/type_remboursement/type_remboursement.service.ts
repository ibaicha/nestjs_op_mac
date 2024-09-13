import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTypeRemboursementDto } from './dto/createTypeRemboursement.dto';
import { UpdateTypeRemboursementDto } from './dto/updateTypeRemboursement.dto';

@Injectable()
export class TypeRemboursementService {
    constructor(private readonly prismaService : PrismaService) {}

    async getAll() {
        return this.prismaService.typeRemboursement.findMany();
    }

    async getOne(typeRemboursementId: number) {
        const typeRemboursement = await this.prismaService.typeRemboursement.findUnique({where: {id: typeRemboursementId}});
        if(!typeRemboursement) throw new NotFoundException('Post not found');
        return typeRemboursement;
    }
    async create(createTypeRemboursementDto: CreateTypeRemboursementDto) {
        const { name} = createTypeRemboursementDto;
        await this.prismaService.typeRemboursement.create({data : { name}});
        return {data : "TypeRemboursement created"};
    }

    async update(typeRemboursementId: number, updateTypeRemboursementDto: UpdateTypeRemboursementDto) {
        const typeRemboursement = await this.prismaService.typeRemboursement.findUnique({where: {id: typeRemboursementId}});
        if(!typeRemboursement) throw new NotFoundException('TypeRemboursement not found');
        await this.prismaService.typeRemboursement.update({where: {id: typeRemboursementId}, data : {...updateTypeRemboursementDto}});
        return {data : "TypeRemboursement updeted!"};
    }

    async delete(typeRemboursementId: number) {
        const typeRemboursement = await this.prismaService.typeRemboursement.findUnique({where: {id: typeRemboursementId}});
        if(!typeRemboursement) throw new NotFoundException('Post not found');
        await this.prismaService.typeRemboursement.delete({where: {id: typeRemboursementId}});
        return {data : "TypeRemboursement deleted"};
    }
}

