import { Village } from '.prisma/client';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserPointDto, UpdateUserPointDto } from './dto/point.dto';


@Injectable()
export class UserPointService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.userPoint.findMany({
      select: {
        id: true,
        userId: true,
        point: {
          select: {
            id: true,
            name: true,
            isProduit: true,
            isIntrant: true,
            isVirtuel: true,
            localite: {
              include: {
                sousZone: {
                  include: {
                    zone: {
                      include: {
                        pays: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async getOne(userPointId: number) {
    const userPoint =
      await this.prismaService.userPoint.findUnique({
        where: { id: userPointId },
      });
    if (!userPoint) throw new NotFoundException('Post not found');
    return userPoint;
  }
  async create(createUserPointDto: CreateUserPointDto) {
    const { userId, pointId } = createUserPointDto;
    await this.prismaService.userPoint.create({
      data: { userId, pointId },
    });
    return { data: 'UserPoint created' };
  }

  async update(
    userPointId: number,
    updateUserPointDto: UpdateUserPointDto,
  ) {
    const userPoint =
      await this.prismaService.userPoint.findUnique({
        where: { id: userPointId },
      });
    if (!userPoint)
      throw new NotFoundException('UserPoint not found');
    await this.prismaService.userPoint.update({
      where: { id: userPointId },
      data: { ...updateUserPointDto },
    });
    return { data: 'UserPoint updeted!' };
  }

  async delete(userPointId: number) {
    const userPoint =
      await this.prismaService.userPoint.findUnique({
        where: { id: userPointId },
      });
    if (!userPoint) throw new NotFoundException('Post not found');
    await this.prismaService.userPoint.delete({
      where: { id: userPointId },
    });
    return { data: 'UserPoint deleted' };
  }
}
