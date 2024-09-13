import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmballageIntrantDto, UpdateEmballageIntrantDto } from './dto/emballageIntrant.dto';


@Injectable()
export class EmballageIntrantService {
    constructor(private readonly prismaService : PrismaService) {}

    async getAll() {
        return this.prismaService.emballageIntrant.findMany(
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
                    chargeExploitation: {
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
                    }
                 
                }
            }
        );
    }

    async getOne(emballageIntrantId: number) {
        const emballageIntrant = await this.prismaService.emballageIntrant.findUnique({where: {id: emballageIntrantId}});
        if(!emballageIntrant) throw new NotFoundException('Post not found');
        return emballageIntrant;
    }
    async create(createEmballageIntrantDto: CreateEmballageIntrantDto) {
        const {name,conditionnement,quantite,pu,valeur,isActive,isDefault,chargeExploitationId,typeEmballageId} = createEmballageIntrantDto;
        await this.prismaService.emballageIntrant.create({data : {name, conditionnement,quantite,pu,valeur,isActive,isDefault,chargeExploitationId,typeEmballageId}});
        return {data : "EmballageIntrant created"};
    }

    async update(emballageIntrantId: number, updateEmballageIntrantDto: UpdateEmballageIntrantDto) {
        const emballageIntrant = await this.prismaService.emballageIntrant.findUnique({where: {id: emballageIntrantId}});
        if(!emballageIntrant) throw new NotFoundException('EmballageIntrant not found');
        await this.prismaService.emballageIntrant.update({where: {id: emballageIntrantId}, data : {...updateEmballageIntrantDto}});
        return {data : "EmballageIntrant updeted!"};
    }

    async delete(emballageIntrantId: number) {
        const emballageIntrant = await this.prismaService.emballageIntrant.findUnique({where: {id: emballageIntrantId}});
        if(!emballageIntrant) throw new NotFoundException('Post not found');
        await this.prismaService.emballageIntrant.delete({where: {id: emballageIntrantId}});
        return {data : "EmballageIntrant deleted"};
    }
}



