import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLocaliteDto } from './dto/createLocalite.dto';
import { UpdateLocaliteDto } from './dto/updateLocalite.dto';

@Injectable()
export class LocaliteService {
    constructor(private readonly prismaService : PrismaService) {}

    async getAll() {
        return this.prismaService.localite.findMany(
            {
                select: {
                    id: true,
                    name: true,
                    sousZone: {
                        select: {
                            id: true,
                            name: true,
                      
                        }
                    }
                }
            }
        )
    }

    async getOne(localiteId: number) {
        const localite = await this.prismaService.localite.findUnique({where: {id: localiteId}});
        if(!localite) throw new NotFoundException('Post not found');
        return localite;
    }
    async create(createLocaliteDto: CreateLocaliteDto) {
        const { name,sousZoneId} = createLocaliteDto;
        await this.prismaService.localite.create({data : { name, sousZoneId}});
        return {data : "Localite created"};
    }

    async update(localiteId: number, updateLocaliteDto: UpdateLocaliteDto) {
        const localite = await this.prismaService.localite.findUnique({where: {id: localiteId}});
        if(!localite) throw new NotFoundException('Localite not found');
        await this.prismaService.localite.update({where: {id: localiteId}, data : {...updateLocaliteDto}});
        return {data : "Localite updeted!"};
    }

    async delete(localiteId: number) {
        const localite = await this.prismaService.localite.findUnique({where: {id: localiteId}});
        if(!localite) throw new NotFoundException('Post not found');
        await this.prismaService.localite.delete({where: {id: localiteId}});
        return {data : "Localite deleted"};
    }
}
