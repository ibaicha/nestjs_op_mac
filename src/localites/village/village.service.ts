import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVillageDto } from './dto/createVillage.dto';
import { UpdateVillageDto } from './dto/updateVillage.dto';

@Injectable()
export class VillageService {
    constructor(private readonly prismaService : PrismaService) {}

    async getAll() {
        return this.prismaService.village.findMany(
            {
                select: {
                    id: true,
                    name: true,
                    localite: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
                
          
            },
        
        )
    }

    async getOne(villageId: number) {
        const village = await this.prismaService.village.findUnique({where: {id: villageId}});
        if(!village) throw new NotFoundException('Post not found');
        return village;
    }
    async create(createVillageDto: CreateVillageDto) {
        const { name,localiteId,communeId} = createVillageDto;
        await this.prismaService.village.create({data:{ name, localiteId, communeId}});
        return {data : "Village created"};
    }

    async update(villageId: number, updateVillageDto: UpdateVillageDto) {
        const village = await this.prismaService.village.findUnique({where: {id: villageId}});
        if(!village) throw new NotFoundException('Village not found');
        await this.prismaService.village.update({where: {id: villageId}, data : {...updateVillageDto}});
        return {data : "Village updeted!"};
    }

    async delete(villageId: number) {
        const village = await this.prismaService.village.findUnique({where: {id: villageId}});
        if(!village) throw new NotFoundException('Post not found');
        await this.prismaService.village.delete({where: {id: villageId}});
        return {data : "Village deleted"};
    }
}

