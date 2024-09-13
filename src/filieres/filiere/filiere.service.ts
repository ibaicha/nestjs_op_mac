import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFiliereDto } from './dto/createFiliere.dto';
import { UpdateFiliereDto } from './dto/updateFiliere.dto';

@Injectable()
export class FiliereService {
    constructor(private readonly prismaService : PrismaService) {}

    async getAll() {
        return this.prismaService.filiere.findMany();
    }

    async getOne(filiereId: number) {
        const filiere = await this.prismaService.filiere.findUnique({where: {id: filiereId}});
        if(!filiere) throw new NotFoundException('Post not found');
        return filiere;
    }
    async create(createFiliereDto: CreateFiliereDto) {
        const { name} = createFiliereDto;
        await this.prismaService.filiere.create({data : { name}});
        return {data : "Filiere created"};
    }

    async update(filiereId: number, updateFiliereDto: UpdateFiliereDto) {
        const filiere = await this.prismaService.filiere.findUnique({where: {id: filiereId}});
        if(!filiere) throw new NotFoundException('Filiere not found');
        await this.prismaService.filiere.update({where: {id: filiereId}, data : {...updateFiliereDto}});
        return {data : "Filiere updeted!"};
    }

    async delete(filiereId: number) {
        const filiere = await this.prismaService.filiere.findUnique({where: {id: filiereId}});
        if(!filiere) throw new NotFoundException('Post not found');
        await this.prismaService.filiere.delete({where: {id: filiereId}});
        return {data : "Filiere deleted"};
    }
}

