import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSousZoneDto } from './dto/createSousZone.dto';
import { UpdateSousZoneDto } from './dto/updateSousZone.dto';

@Injectable()
export class SousZoneService {
    constructor(private readonly prismaService : PrismaService) {}

    async getAll() {
        return this.prismaService.sousZone.findMany(
            {
                select: {
                    id: true,
                    name: true,
                    zone: {
                        select: {
                            id: true,
                            name: true,
                           
                        }
                    }
                
                }
            }
        )
    }

    async getOne(sousZoneId: number) {
        const sousZone = await this.prismaService.sousZone.findUnique({where: {id: sousZoneId}});
        if(!sousZone) throw new NotFoundException('Post not found');
        return sousZone;
    }
    async create(createSousZoneDto: CreateSousZoneDto) {
        const { name,zoneId} = createSousZoneDto;
        await this.prismaService.sousZone.create({data : { name, zoneId}});
        return {data : "SousZone created"};
    }

    async update(sousZoneId: number, updateSousZoneDto: UpdateSousZoneDto) {
        const sousZone = await this.prismaService.sousZone.findUnique({where: {id: sousZoneId}});
        if(!sousZone) throw new NotFoundException('SousZone not found');
        await this.prismaService.sousZone.update({where: {id: sousZoneId}, data : {...updateSousZoneDto}});
        return {data : "SousZone updeted!"};
    }

    async delete(sousZoneId: number) {
        const sousZone = await this.prismaService.sousZone.findUnique({where: {id: sousZoneId}});
        if(!sousZone) throw new NotFoundException('Post not found');
        await this.prismaService.sousZone.delete({where: {id: sousZoneId}});
        return {data : "SousZone deleted"};
    }
}

