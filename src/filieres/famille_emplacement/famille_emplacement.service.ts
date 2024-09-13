import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFamilleEmplacementDto } from './dto/createFamilleEmplacement.dto';
import { UpdateFamilleEmplacementDto } from './dto/updateFamilleEmplacement.dto';

@Injectable()
export class FamilleEmplacementService {
    constructor(private readonly prismaService : PrismaService) {}

    async getAll() {
        return this.prismaService.familleEmplacement.findMany();
    }

    async getOne(familleEmplacementId: number) {
        const familleEmplacement = await this.prismaService.familleEmplacement.findUnique({where: {id: familleEmplacementId}});
        if(!familleEmplacement) throw new NotFoundException('Post not found');
        return familleEmplacement;
    }
    async create(createFamilleEmplacementDto: CreateFamilleEmplacementDto) {
        const { name} = createFamilleEmplacementDto;
        await this.prismaService.familleEmplacement.create({data : { name}});
        return {data : "FamilleEmplacement created"};
    }

    async update(familleEmplacementId: number, updateFamilleEmplacementDto: UpdateFamilleEmplacementDto) {
        const familleEmplacement = await this.prismaService.familleEmplacement.findUnique({where: {id: familleEmplacementId}});
        if(!familleEmplacement) throw new NotFoundException('FamilleEmplacement not found');
        await this.prismaService.familleEmplacement.update({where: {id: familleEmplacementId}, data : {...updateFamilleEmplacementDto}});
        return {data : "FamilleEmplacement updeted!"};
    }

    async delete(familleEmplacementId: number) {
        const familleEmplacement = await this.prismaService.familleEmplacement.findUnique({where: {id: familleEmplacementId}});
        if(!familleEmplacement) throw new NotFoundException('Post not found');
        await this.prismaService.familleEmplacement.delete({where: {id: familleEmplacementId}});
        return {data : "FamilleEmplacement deleted"};
    }
}

