import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmballageDto } from './dto/createEmballage.dto';
import { UpdateEmballageDto } from './dto/updateEmballage.dto';

@Injectable()
export class EmballageService {
    constructor(private readonly prismaService : PrismaService) {}

    async getAll() {
        return this.prismaService.emballage.findMany(
            {
                select: {
                    id: true,
                    name: true,
                    conditionnement: true,
                    quantite: true,
                    pu: true,
                    valeur: true,
                    isActive: true,
                    isDefault: true,
                    produit: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    typeEmballage: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    uniteGrandeur : {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            }
        );
    }

    async getOne(emballageId: number) {
        const emballage = await this.prismaService.emballage.findUnique({where: {id: emballageId}});
        if(!emballage) throw new NotFoundException('Post not found');
        return emballage;
    }
    async create(createEmballageDto: CreateEmballageDto) {
        const {name,conditionnement,quantite,pu,valeur,isActive,isDefault,produitId,typeEmballageId,uniteGrandeurId} = createEmballageDto;
        await this.prismaService.emballage.create({data : {name, conditionnement,quantite,pu,valeur,isActive,isDefault,produitId,typeEmballageId,uniteGrandeurId}});
        return {data : "Emballage created"};
    }

    async update(emballageId: number, updateEmballageDto: UpdateEmballageDto) {
        const emballage = await this.prismaService.emballage.findUnique({where: {id: emballageId}});
        if(!emballage) throw new NotFoundException('Emballage not found');
        await this.prismaService.emballage.update({where: {id: emballageId}, data : {...updateEmballageDto}});
        return {data : "Emballage updeted!"};
    }

    async delete(emballageId: number) {
        const emballage = await this.prismaService.emballage.findUnique({where: {id: emballageId}});
        if(!emballage) throw new NotFoundException('Post not found');
        await this.prismaService.emballage.delete({where: {id: emballageId}});
        return {data : "Emballage deleted"};
    }
}


