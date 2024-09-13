import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAnneeDto } from './dto/createAnnee.dto';
import { UpdateAnneeDto } from './dto/updateAnnee.dto';

@Injectable()
export class AnneeService {
    constructor(private readonly prismaService : PrismaService) {}

    async getAll() {
        return this.prismaService.annee.findMany();
    }

    async getOne(anneeId: number) {
        const annee = await this.prismaService.annee.findUnique({where: {id: anneeId}});
        if(!annee) throw new NotFoundException('Post not found');
        return annee;
    }
    async create(createAnneeDto: CreateAnneeDto) {
        const { name, valeur } = createAnneeDto;
        await this.prismaService.annee.create({data : { name, valeur }});
        return {data : "Annee created"};
    }

    async update(anneeId: number, updateAnneeDto: UpdateAnneeDto) {
        const annee = await this.prismaService.annee.findUnique({where: {id: anneeId}});
        if(!annee) throw new NotFoundException('Annee not found');
        await this.prismaService.annee.update({where: {id: anneeId}, data : {...updateAnneeDto}});
        return {data : "Annee updeted!"};
    }

    async delete(anneeId: number) {
        const annee = await this.prismaService.annee.findUnique({where: {id: anneeId}});
        if(!annee) throw new NotFoundException('Post not found');
        await this.prismaService.annee.delete({where: {id: anneeId}});
        return {data : "Annee deleted"};
    }
}

