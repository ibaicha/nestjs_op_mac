import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUniteGrandeurDto, UpdateUniteGrandeurDto } from './dto/uniteGrandeur.dto';

@Injectable()
export class UniteGrandeurService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.uniteGrandeur.findMany({
      select: {
        id: true,
        name: true,
        typeUniteGrandeur: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async getOne(uniteGrandeurId: number) {
    const uniteGrandeur = await this.prismaService.uniteGrandeur.findUnique({
      where: { id: uniteGrandeurId },
    });
    if (!uniteGrandeur) throw new NotFoundException('Post not found');
    return uniteGrandeur;
  }
  async create(createUniteGrandeurDto: CreateUniteGrandeurDto) {
    const { name, typeUniteGrandeurId } =
      createUniteGrandeurDto;
    await this.prismaService.uniteGrandeur.create({
      data: { name, typeUniteGrandeurId },
    });
    return { data: 'UniteGrandeur created' };
  }

  async update(
    uniteGrandeurId: number,
    updateUniteGrandeurDto: UpdateUniteGrandeurDto,
  ) {
    const uniteGrandeur = await this.prismaService.uniteGrandeur.findUnique({
      where: { id: uniteGrandeurId },
    });
    if (!uniteGrandeur) throw new NotFoundException('UniteGrandeur not found');
    await this.prismaService.uniteGrandeur.update({
      where: { id: uniteGrandeurId },
      data: { ...updateUniteGrandeurDto },
    });
    return { data: 'UniteGrandeur updeted!' };
  }

  async delete(uniteGrandeurId: number) {
    const uniteGrandeur = await this.prismaService.uniteGrandeur.findUnique({
      where: { id: uniteGrandeurId },
    });
    if (!uniteGrandeur) throw new NotFoundException('Post not found');
    await this.prismaService.uniteGrandeur.delete({
      where: { id: uniteGrandeurId },
    });
    return { data: 'UniteGrandeur deleted' };
  }
}
