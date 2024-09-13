import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePointDto, UpdatePointDto } from './dto/point.dto';

@Injectable()
export class PointService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.point.findMany({
      select: {
        id: true,
        name: true,
        isIntrant: true,
        isProduit: true,
        isVirtuel: true,
        localite: {
          select: {
            id: true,
            name: true,
            sousZone: {
              select: {
                id: true,
                name: true,
                zone: {
                  select: {
                    id: true,
                    name: true,
                    pays: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        entrepots: {
          include: {
            emplacements: true,
          }
        },
      
      },
    });
  }

  async getOne(pointId: number) {
    const point = await this.prismaService.point.findUnique({
      where: { id: pointId },
    });
    if (!point) throw new NotFoundException('Post not found');
    return point;
  }
  async create(createPointDto: CreatePointDto) {
    const { name, isProduit, isIntrant, isVirtuel, localiteId } =
      createPointDto;
    await this.prismaService.point.create({
      data: { name, isProduit, isIntrant, isVirtuel, localiteId },
    });
    return { data: 'Point created' };
  }

  async update(pointId: number, updatePointDto: UpdatePointDto) {
    const point = await this.prismaService.point.findUnique({
      where: { id: pointId },
    });
    if (!point) throw new NotFoundException('Point not found');
    await this.prismaService.point.update({
      where: { id: pointId },
      data: { ...updatePointDto },
    });
    return { data: 'Point updeted!' };
  }

  async delete(pointId: number) {
    const point = await this.prismaService.point.findUnique({
      where: { id: pointId },
    });
    if (!point) throw new NotFoundException('Post not found');
    await this.prismaService.point.delete({ where: { id: pointId } });
    return { data: 'Point deleted' };
  }
}
