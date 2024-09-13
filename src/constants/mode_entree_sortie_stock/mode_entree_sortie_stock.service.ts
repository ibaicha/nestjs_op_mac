import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateModeEntreeSortieStockDto } from './dto/createModeEntreeSortieStock.dto';
import { UpdateModeEntreeSortieStockDto } from './dto/updateModeEntreeSortieStock.dto';

@Injectable()
export class ModeEntreeSortieStockService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.modeEntreeSortieStock.findMany({
      select: {
        id: true,
        code: true,
        name: true,
        typeMouvementStock: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async getOne(modeEntreeSortieStockId: number) {
    const modeEntreeSortieStock =
      await this.prismaService.modeEntreeSortieStock.findUnique({
        where: { id: modeEntreeSortieStockId },
      });
    if (!modeEntreeSortieStock) throw new NotFoundException('Post not found');
    return modeEntreeSortieStock;
  }
  async create(createModeEntreeSortieStockDto: CreateModeEntreeSortieStockDto) {
    const { code, name, typeMouvementStockId } = createModeEntreeSortieStockDto;
    await this.prismaService.modeEntreeSortieStock.create({
      data: { code, name, typeMouvementStockId },
    });
    return { data: 'ModeEntreeSortieStock created' };
  }

  async update(
    modeEntreeSortieStockId: number,
    updateModeEntreeSortieStockDto: UpdateModeEntreeSortieStockDto,
  ) {
    const modeEntreeSortieStock =
      await this.prismaService.modeEntreeSortieStock.findUnique({
        where: { id: modeEntreeSortieStockId },
      });
    if (!modeEntreeSortieStock)
      throw new NotFoundException('ModeEntreeSortieStock not found');
    await this.prismaService.modeEntreeSortieStock.update({
      where: { id: modeEntreeSortieStockId },
      data: { ...updateModeEntreeSortieStockDto },
    });
    return { data: 'ModeEntreeSortieStock updeted!' };
  }

  async delete(modeEntreeSortieStockId: number) {
    const modeEntreeSortieStock =
      await this.prismaService.modeEntreeSortieStock.findUnique({
        where: { id: modeEntreeSortieStockId },
      });
    if (!modeEntreeSortieStock) throw new NotFoundException('Post not found');
    await this.prismaService.modeEntreeSortieStock.delete({
      where: { id: modeEntreeSortieStockId },
    });
    return { data: 'ModeEntreeSortieStock deleted' };
  }
}
