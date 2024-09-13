import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAgenceDto, UpdateAgenceDto } from './dto/agence.dto';


@Injectable()
export class AgenceService {
    constructor(private readonly prismaService : PrismaService) {}

    async getAll() {
        return this.prismaService.agence.findMany(
            {
                select: {
                    id: true,
                    name: true,
                    sigle: true,
                    societe: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            }

        
        )
    }

    async getOne(agenceId: number) {
        const agence = await this.prismaService.agence.findUnique({where: {id: agenceId}});
        if(!agence) throw new NotFoundException('Post not found');
        return agence;
    }
    async create(createAgenceDto: CreateAgenceDto) {
        const { name, sigle,societeId} = createAgenceDto;
        await this.prismaService.agence.create({data : { name, sigle, societeId}});
        return {data : "Agence created"};
    }

    async update(agenceId: number, updateAgenceDto: UpdateAgenceDto) {
        const agence = await this.prismaService.agence.findUnique({where: {id: agenceId}});
        if(!agence) throw new NotFoundException('Agence not found');
        await this.prismaService.agence.update({where: {id: agenceId}, data : {...updateAgenceDto}});
        return {data : "Agence updeted!"};
    }

    async delete(agenceId: number) {
        const agence = await this.prismaService.agence.findUnique({where: {id: agenceId}});
        if(!agence) throw new NotFoundException('Post not found');
        await this.prismaService.agence.delete({where: {id: agenceId}});
        return {data : "Agence deleted"};
    }
}

