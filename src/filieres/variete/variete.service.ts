import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVarieteDto } from './dto/createVariete.dto';
import { UpdateVarieteDto } from './dto/updateVariete.dto';

@Injectable()
export class VarieteService {
    constructor(private readonly prismaService : PrismaService) {}

    async getAll() {
        return this.prismaService.variete.findMany(
            {
                select: {
                    id: true,
                    name: true,
                    surface_unite : true,
                    quantite_unite : true,
                    pu_unite : true,
                    rendement_unite : true,
                    isActive: true,
                    produit : {
                        select: {
                            id: true,
                            name: true,
                            isDerive: true,
                            isEnsachage: true,
                            isActive: true,
                           
                            filiere: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            },
                            familleEmplacement: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            }
                        }
                    }

                
                }
            }
        );
    }

    async getOne(varieteId: number) {
        const variete = await this.prismaService.variete.findUnique({where: {id: varieteId}});
        if(!variete) throw new NotFoundException('Post not found');
        return variete;
    }
    async create(createVarieteDto: CreateVarieteDto) {
        const { name,surface_unite, quantite_unite, pu_unite, rendement_unite, isActive, produitId} = createVarieteDto;
        await this.prismaService.variete.create({data : { name, surface_unite, quantite_unite,pu_unite, rendement_unite, isActive, produitId}});
        return {data : "Variete created"};
    }

    async update(varieteId: number, updateVarieteDto: UpdateVarieteDto) {
        const variete = await this.prismaService.variete.findUnique({where: {id: varieteId}});
        if(!variete) throw new NotFoundException('Variete not found');
        await this.prismaService.variete.update({where: {id: varieteId}, data : {...updateVarieteDto}});
        return {data : "Variete updeted!"};
    }

    async delete(varieteId: number) {
        const variete = await this.prismaService.variete.findUnique({where: {id: varieteId}});
        if(!variete) throw new NotFoundException('Post not found');
        await this.prismaService.variete.delete({where: {id: varieteId}});
        return {data : "Variete deleted"};
    }
}

