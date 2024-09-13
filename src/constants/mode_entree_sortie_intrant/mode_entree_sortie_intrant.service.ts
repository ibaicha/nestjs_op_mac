import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateModeEntreeSortieIntrantDto } from './dto/createModeEntreeSortieIntrant.dto';
import { UpdateModeEntreeSortieIntrantDto } from './dto/updateModeEntreeSortieIntrant.dto';

@Injectable()
export class ModeEntreeSortieIntrantService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.modeEntreeSortieIntrant.findMany({
      select: {
        id: true,
        code: true,
        name: true,
        typeMouvementIntrant: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async getOne(modeEntreeSortieIntrantId: number) {
    const modeEntreeSortieIntrant =
      await this.prismaService.modeEntreeSortieIntrant.findUnique({
        where: { id: modeEntreeSortieIntrantId },
      });
    if (!modeEntreeSortieIntrant) throw new NotFoundException('Post not found');
    return modeEntreeSortieIntrant;
  }
  async create(createModeEntreeSortieIntrantDto: CreateModeEntreeSortieIntrantDto) {
    const { code, name, typeMouvementIntrantId } = createModeEntreeSortieIntrantDto;
    await this.prismaService.modeEntreeSortieIntrant.create({
      data: { code, name, typeMouvementIntrantId },
    });
    return { data: 'ModeEntreeSortieIntrant created' };
  }

  async update(
    modeEntreeSortieIntrantId: number,
    updateModeEntreeSortieIntrantDto: UpdateModeEntreeSortieIntrantDto,
  ) {
    const modeEntreeSortieIntrant =
      await this.prismaService.modeEntreeSortieIntrant.findUnique({
        where: { id: modeEntreeSortieIntrantId },
      });
    if (!modeEntreeSortieIntrant)
      throw new NotFoundException('ModeEntreeSortieIntrant not found');
    await this.prismaService.modeEntreeSortieIntrant.update({
      where: { id: modeEntreeSortieIntrantId },
      data: { ...updateModeEntreeSortieIntrantDto },
    });
    return { data: 'ModeEntreeSortieIntrant updeted!' };
  }

  async delete(modeEntreeSortieIntrantId: number) {
    const modeEntreeSortieIntrant =
      await this.prismaService.modeEntreeSortieIntrant.findUnique({
        where: { id: modeEntreeSortieIntrantId },
      });
    if (!modeEntreeSortieIntrant) throw new NotFoundException('Post not found');
    await this.prismaService.modeEntreeSortieIntrant.delete({
      where: { id: modeEntreeSortieIntrantId },
    });
    return { data: 'ModeEntreeSortieIntrant deleted' };
  }
}
