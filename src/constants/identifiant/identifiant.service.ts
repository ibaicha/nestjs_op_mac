import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateIdentifiantDto,
  GetIdentifiantParamsDTO,
  IIdentifiant,
  UpdateIdentifiantDto,
} from './dto/identifiant.dto';
import { applyFilters } from 'src/utils/filters';
import { Prisma } from '@prisma/client';

@Injectable()
export class IdentifiantService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.identifiant.findMany({
      select: {
        id: true,
        sexe: true,
        annee_true: true,
        code_numeric: true,
      },
    });
  }

  async getAllIdentifiantsWithFilters(
    params: GetIdentifiantParamsDTO,
  ): Promise<IIdentifiant[]> {
    try {
      const { whereBuilder } = await applyFilters<Prisma.identifiantWhereInput>(
        {
          appliedFiltersInput: params,
          availableFilters: {
            id: async ({ filter }) => {
              return {
                where: {
                  id: {
                    in: (filter as string).split(',').map(Number),
                  },
                },
              };
            },
            sexe: async ({ filter }) => {
              return {
                where: {
                  sexe: {
                    in: (filter as string).split(',').map(Number),
                  },
                },
              };
            },
            annee_true: async ({ filter }) => {
              return {
                where: {
                  annee_true: {
                    in: (filter as string).split(',').map(Number),
                  },
                },
              };
            },
            code_numeric: async ({ filter }) => {
              return {
                where: {
                  code_numeric: {
                    in: (filter as string).split(',').map(Number),
                  },
                },
              };
            },
          },
        },
      );

      const identifiantWithFilters =
        await this.prismaService.identifiant.findMany({
          where: whereBuilder,
          /*
          select: {
            id: true,
            sexe: true,
            annee_string: true,
            annee_numeric: true,
            annee_true: true,
            ordre_string: true,
            ordre_numeric: true,
            code_string: true,
            code_numeric: true,
          },
          

          where: {
            id: 985,
          },
          */
        });

      const identifiants: IIdentifiant[] = [];

      for (const myIdentifiant of identifiantWithFilters) {
        identifiants.push({
          ...myIdentifiant,
        });
      }

      return identifiants;
    } catch (error) {
      throw new ForbiddenException(error);
    } finally {
      await this.prismaService.$disconnect();
    }
  }

  async getOne(identifiantId: number) {
    const identifiant = await this.prismaService.identifiant.findUnique({
      where: { id: identifiantId },
    });
    if (!identifiant) throw new NotFoundException('Post not found');
    return identifiant;
  }
  async create(createIdentifiantDto: CreateIdentifiantDto) {
    const {
      sexe,
      annee_string,
      annee_numeric,
      annee_true,
      ordre_string,
      ordre_numeric,
      code_string,
      code_numeric,
    } = createIdentifiantDto;
    await this.prismaService.identifiant.create({
      data: {
        sexe,
        annee_string,
        annee_numeric,
        annee_true,
        ordre_string,
        ordre_numeric,
        code_string,
        code_numeric,
      },
    });
    return { data: 'Identifiant created' };
  }

  async update(
    identifiantId: number,
    updateIdentifiantDto: UpdateIdentifiantDto,
  ) {
    const identifiant = await this.prismaService.identifiant.findUnique({
      where: { id: identifiantId },
    });
    if (!identifiant) throw new NotFoundException('Identifiant not found');
    await this.prismaService.identifiant.update({
      where: { id: identifiantId },
      data: { ...updateIdentifiantDto },
    });
    return { data: 'Identifiant updeted!' };
  }

  async delete(identifiantId: number) {
    const identifiant = await this.prismaService.identifiant.findUnique({
      where: { id: identifiantId },
    });
    if (!identifiant) throw new NotFoundException('Post not found');
    await this.prismaService.identifiant.delete({
      where: { id: identifiantId },
    });
    return { data: 'Identifiant deleted' };
  }
}
