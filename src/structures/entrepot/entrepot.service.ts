import {
    ForbiddenException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { PrismaService } from 'src/prisma/prisma.service';
  import { CreateEntrepotDto } from './dto/entrepot.dto';
  
  
  @Injectable()
  export class EntrepotService {
    constructor(private readonly prismaService: PrismaService) {}
  
    async getAll() {
      return this.prismaService.entrepot.findMany({
        select: {
          id: true,
          name: true,
          adresse: true,
          point: {
            select: {
              id: true,
              name: true,
              isProduit: true,
              isIntrant: true,
              isVirtuel: true,
              
            },
          },
        },
      });
    }
  
    async getOne(entrepotId: number) {
      const entrepot = await this.prismaService.entrepot.findUnique({
        where: { id: entrepotId },
      });
      if (!entrepot) throw new NotFoundException('Post not found');
      return entrepot;
    }
    async create(createEntrepotDto: CreateEntrepotDto) {
      const { name, adresse, pointId } = createEntrepotDto;
      await this.prismaService.entrepot.create({
        data: { name, adresse, pointId },
      });
      return { data: 'Entrepot created' };
    }
  
    async update(entrepotId: number, updateEntrepotDto: CreateEntrepotDto) {
      const entrepot = await this.prismaService.entrepot.findUnique({
        where: { id: entrepotId },
      });
      if (!entrepot) throw new NotFoundException('Entrepot not found');
      await this.prismaService.entrepot.update({
        where: { id: entrepotId },
        data: { ...updateEntrepotDto },
      });
      return { data: 'Entrepot updeted!' };
    }
  
    async delete(entrepotId: number) {
      const entrepot = await this.prismaService.entrepot.findUnique({
        where: { id: entrepotId },
      });
      if (!entrepot) throw new NotFoundException('Post not found');
      await this.prismaService.entrepot.delete({ where: { id: entrepotId } });
      return { data: 'Entrepot deleted' };
    }
  }
  
