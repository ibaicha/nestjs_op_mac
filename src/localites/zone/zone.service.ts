import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateZoneDto } from './dto/createZone.dto';
import { UpdateZoneDto } from './dto/updateZone.dto';

@Injectable()
export class ZoneService {
    constructor(private readonly prismaService : PrismaService) {}

    async getAll() {
        return this.prismaService.zone.findMany(
            {
                select: {
                    id: true,
                    name: true,
                    pays: {
                        select: {
                            id: true,
                            name: true,
                            sigle: true
                        }
                    }
                }
                
          
            },
        
        )
    }

    async getOne(zoneId: number) {
        const zone = await this.prismaService.zone.findUnique({where: {id: zoneId}});
        if(!zone) throw new NotFoundException('Post not found');
        return zone;
    }
    async create(createZoneDto: CreateZoneDto) {
        const { name,paysId} = createZoneDto;
        await this.prismaService.zone.create({data : { name, paysId}});
        return {data : "Zone created"};
    }

    async update(zoneId: number, updateZoneDto: UpdateZoneDto) {
        const zone = await this.prismaService.zone.findUnique({where: {id: zoneId}});
        if(!zone) throw new NotFoundException('Zone not found');
        await this.prismaService.zone.update({where: {id: zoneId}, data : {...updateZoneDto}});
        return {data : "Zone updeted!"};
    }

    async delete(zoneId: number) {
        const zone = await this.prismaService.zone.findUnique({where: {id: zoneId}});
        if(!zone) throw new NotFoundException('Post not found');
        await this.prismaService.zone.delete({where: {id: zoneId}});
        return {data : "Zone deleted"};
    }
}
