import {
    ForbiddenException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { PrismaService } from 'src/prisma/prisma.service';
  import { Op } from '@prisma/client';
import { CreatePointAgenceDto, UpdatePointAgenceDto } from './dto/point_agence.dto';
  
  @Injectable()
  export class PointAgenceService {
    constructor(private readonly prismaService: PrismaService) {}
  
    async getAll() {
      return this.prismaService.pointAgence.findMany(
        {
          select: {
            id: true,
            point: true,
            agence: {
              select: {
                id: true,
                name: true,
                sigle: true,
                societe: {
                  select: {
                    id: true,
                    name: true,
                    typeSociete: {
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
      );
    }
  
    async getCustomAll() {
      return this.prismaService.pointAgence.findMany(
        {
          select: {
            id: true,
            point: {
              select: {
                id: true,
                name: true,
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
                ops: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
            agence: {
              select: {
                id: true,
                name: true,
                sigle: true,
                societe: {
                  select: {
                    id: true,
                    name: true,
                    typeSociete: {
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
      );
    }
  
    async getOpsFromAgenceFinancier(agenceId: number) {
      return this.prismaService.pointAgence.findMany(
        {
          select: {
            id: true,
            point: {
              select: {
                id: true,
                name: true,
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
                ops: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
            agence: {
              select: {
                id: true,
                name: true,
                sigle: true,
                societe: {
                  select: {
                    id: true,
                    name: true,
                    typeSociete: {
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
          where: {
            agenceId: agenceId,
          },
        },
      );
    }
  
    async getOne(pointAgenceId: number) {
      const pointAgence =
        await this.prismaService.pointAgence.findUnique(
          { where: { id: pointAgenceId } },
        );
      if (!pointAgence)
        throw new NotFoundException('Post not found');
      return pointAgence;
    }
    async create(
      createPointAgenceDto: CreatePointAgenceDto,
    ) {
      const { pointId, agenceId } =
        createPointAgenceDto;
      await this.prismaService.pointAgence.create({
        data: { pointId, agenceId },
      });
      return { data: 'PointAgence created' };
    }
  
    async update(
      pointAgenceId: number,
      updatePointAgenceDto: UpdatePointAgenceDto,
    ) {
      const pointAgence =
        await this.prismaService.pointAgence.findUnique(
          { where: { id: pointAgenceId } },
        );
      if (!pointAgence)
        throw new NotFoundException(
          'PointAgence not found',
        );
      await this.prismaService.pointAgence.update({
        where: { id: pointAgenceId },
        data: { ...updatePointAgenceDto },
      });
      return { data: 'PointAgence updeted!' };
    }
  
    async delete(pointAgenceId: number) {
      const pointAgence =
        await this.prismaService.pointAgence.findUnique(
          { where: { id: pointAgenceId } },
        );
      if (!pointAgence)
        throw new NotFoundException('Post not found');
      await this.prismaService.pointAgence.delete({
        where: { id: pointAgenceId },
      });
      return { data: 'PointAgence deleted' };
    }
  }
  
