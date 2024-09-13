import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserSocieteDto, UpdateUserSocieteDto } from './dto/userSociete.dto';

@Injectable()
export class UserSocieteService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.userSociete.findMany({
      select: {
        id: true,
        userId: true,
        societe: {
          select: {
            id: true,
            name: true,
            sigle: true,
          },
        },
      },
    });
  }

  async getOne(userSocieteId: number) {
    const userSociete = await this.prismaService.userSociete.findUnique({
      where: { id: userSocieteId },
    });
    if (!userSociete) throw new NotFoundException('Post not found');
    return userSociete;
  }
  async create(createUserSocieteDto: CreateUserSocieteDto) {
    const { userId, societeId } = createUserSocieteDto;
    await this.prismaService.userSociete.create({
      data: { userId, societeId },
    });
    return { data: 'UserSociete created' };
  }

  async update(
    userSocieteId: number,
    updateUserSocieteDto: UpdateUserSocieteDto,
  ) {
    const userSociete = await this.prismaService.userSociete.findUnique({
      where: { id: userSocieteId },
    });
    if (!userSociete) throw new NotFoundException('UserSociete not found');
    await this.prismaService.userSociete.update({
      where: { id: userSocieteId },
      data: { ...updateUserSocieteDto },
    });
    return { data: 'UserSociete updeted!' };
  }

  async delete(userSocieteId: number) {
    const userSociete = await this.prismaService.userSociete.findUnique({
      where: { id: userSocieteId },
    });
    if (!userSociete) throw new NotFoundException('Post not found');
    await this.prismaService.userSociete.delete({
      where: { id: userSocieteId },
    });
    return { data: 'UserSociete deleted' };
  }
}
