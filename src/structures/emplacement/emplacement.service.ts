import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmplacementDto, UpdateEmplacementDto } from './dto/emplacement.dto';




@Injectable()
export class EmplacementService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.emplacement.findMany({
      select: {
        id: true,
        name: true,
        code: true,
        capacite: true,
        entrepot: {
          select: {
            id: true,
            name: true,
            adresse: true,
          },
        },
        familleEmplacement: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async getOne(emplacementId: number) {
    const emplacement = await this.prismaService.emplacement.findUnique({
      where: { id: emplacementId },
    });
    if (!emplacement) throw new NotFoundException('Post not found');
    return emplacement;
  }
  async create(createEmplacementDto: CreateEmplacementDto) {
    const { name, code, capacite, entrepotId, familleEmplacementId } =
      createEmplacementDto;
    await this.prismaService.emplacement.create({
      data: { name, code, capacite, entrepotId, familleEmplacementId },
    });
    return { data: 'Emplacement created' };
  }

  async update(
    emplacementId: number,
    updateEmplacementDto: UpdateEmplacementDto,
  ) {
    const emplacement = await this.prismaService.emplacement.findUnique({
      where: { id: emplacementId },
    });
    if (!emplacement) throw new NotFoundException('Emplacement not found');
    await this.prismaService.emplacement.update({
      where: { id: emplacementId },
      data: { ...updateEmplacementDto },
    });
    return { data: 'Emplacement updeted!' };
  }

  async delete(emplacementId: number) {
    const emplacement = await this.prismaService.emplacement.findUnique({
      where: { id: emplacementId },
    });
    if (!emplacement) throw new NotFoundException('Post not found');
    await this.prismaService.emplacement.delete({
      where: { id: emplacementId },
    });
    return { data: 'Emplacement deleted' };
  }
}
