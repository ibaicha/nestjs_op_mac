import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCampagneDto } from './dto/createCampagne.dto';
import { UpdateCampagneDto } from './dto/updateCampagne.dto';

@Injectable()
export class CampagneService {
    constructor(private readonly prismaService : PrismaService) {}

    async getAll() {
        return this.prismaService.campagne.findMany(
            {
                select: {
                    id:true,
                    annee: {
                        select: {
                            id: true,
                            name: true,
                            valeur: true
                        }
                    },
                    saison: {
                        select: {
                            id: true,
                            name: true,
                            description: true
                        }
                    }
                }
            }

        );
    }

    async getOne(campagneId: number) {
        const campagne = await this.prismaService.campagne.findUnique({where: {id: campagneId}});
        if(!campagne) throw new NotFoundException('Post not found');
        return campagne;
    }
    async create(createCampagneDto: CreateCampagneDto) {
        const { anneeId, saisonId } = createCampagneDto;
        await this.prismaService.campagne.create({data : { anneeId, saisonId}});
        return {data : "Campagne created"};
    }

    async update(campagneId: number, updateCampagneDto: UpdateCampagneDto) {
        const campagne = await this.prismaService.campagne.findUnique({where: {id: campagneId}});
        if(!campagne) throw new NotFoundException('Campagne not found');
        await this.prismaService.campagne.update({where: {id: campagneId}, data : {...updateCampagneDto}});
        return {data : "Campagne updeted!"};
    }

    async delete(campagneId: number) {
        const campagne = await this.prismaService.campagne.findUnique({where: {id: campagneId}});
        if(!campagne) throw new NotFoundException('Post not found');
        await this.prismaService.campagne.delete({where: {id: campagneId}});
        return {data : "Campagne deleted"};
    }
}

