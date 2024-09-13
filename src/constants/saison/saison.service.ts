import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaisonDto } from './dto/createSaison.dto';
import { UpdateSaisonDto } from './dto/updateSaison.dto';

@Injectable()
export class SaisonService {
    constructor(private readonly prismaService : PrismaService) {}

    async getAll() {
        return this.prismaService.saison.findMany();
    }

    async getOne(saisonId: number) {
        const saison = await this.prismaService.saison.findUnique({where: {id: saisonId}});
        if(!saison) throw new NotFoundException('Post not found');
        return saison;
    }
    async create(createSaisonDto: CreateSaisonDto) {
        const { name, description} = createSaisonDto;
        await this.prismaService.saison.create({data : { name,description}});
        return {data : "Saison created"};
    }

    async update(saisonId: number, updateSaisonDto: UpdateSaisonDto) {
        const saison = await this.prismaService.saison.findUnique({where: {id: saisonId}});
        if(!saison) throw new NotFoundException('Saison not found');
        await this.prismaService.saison.update({where: {id: saisonId}, data : {...updateSaisonDto}});
        return {data : "Saison updeted!"};
    }

    async delete(saisonId: number) {
        const saison = await this.prismaService.saison.findUnique({where: {id: saisonId}});
        if(!saison) throw new NotFoundException('Post not found');
        await this.prismaService.saison.delete({where: {id: saisonId}});
        return {data : "Saison deleted"};
    }
}

