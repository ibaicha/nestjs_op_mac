import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOpDto, GetOpParamsDTO, IOp, UpdateOpDto } from './dto/op.dto';
import { applyFilters } from 'src/utils/filters';
import { Prisma } from '@prisma/client';

@Injectable()
export class OpService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllOpsCustomFromAgence1(agenceId: number) {
    try {
      const opsWithType = await this.prismaService.op.findMany({
        include: {
          typeOp: true,
          point: {
            select: {
              id: true,
              name: true,
              pointAgences: {
                select: {
                  id: true,
                  agence: true,
                },
              },
            },
          },
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
        },
        where: {
          point: {
            pointAgences: {
              some: {
                agenceId: agenceId,
              },
            },
          },
        },
      });
      // return opsWithType;
      const ops: {
        id: number;
        name: string;
        typeOpId: number;
        typeOpName: string;
        pointId: number;
        pointName: string;
        agenceId: number;
        agenceName: string;
        localiteId: number;
        localiteName: string;
        sousZoneId: number;
        sousZoneName: string;
        zoneId: number;
        zoneName: string;
      }[] = [];

      for (const op of opsWithType) {
        // console.log(`Op: ${op.name}`);
        // if(op.point)
        ops.push({
          id: op.id,
          name: op.name,
          typeOpId: op.typeOp.id,
          typeOpName: op.typeOp.name,

          agenceId: op.point == null ? 0 : op.point.pointAgences[0].agence.id,
          agenceName:
            op.point == null ? '' : op.point.pointAgences[0].agence.name,

          pointId: op.point == null ? 0 : op.point.id,
          pointName: op.point == null ? '' : op.point.name,
          localiteId: op.localite == null ? 0 : op.localite.id,
          localiteName: op.localite == null ? '' : op.localite.name,
          sousZoneId:
            op.localite.sousZone == null ? 0 : op.localite.sousZone.id,
          sousZoneName:
            op.localite.sousZone == null ? '' : op.localite.sousZone.name,
          zoneId:
            op.localite.sousZone.zone == null
              ? 0
              : op.localite.sousZone.zone.id,
          zoneName:
            op.localite.sousZone.zone == null
              ? ''
              : op.localite.sousZone.zone.name,
        });
      }
      return ops;
    } catch (error) {
      throw new ForbiddenException(error);
    } finally {
      await this.prismaService.$disconnect();
    }
  }
  async getAllOpsCustomFromAgence2(agenceId: number) {
    try {
      const opsWithType = await this.prismaService.op.findMany({
        include: {
          typeOp: true,
          point: {
            select: {
              id: true,
              name: true,
              pointAgences: {
                select: {
                  id: true,
                  agence: true,
                },
              },
            },
          },
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
        },
        where: {
          point: {
            pointAgences: {
              some: {
                agenceId: agenceId,
              },
            },
          },
        },
      });
      // return opsWithType;
      const ops: {
        id: number;
        name: string;
        typeOpId: number;
        typeOpName: string;
        pointId: number;
        pointName: string;
        agenceId: number;
        agenceName: string;
        localiteId: number;
        localiteName: string;
        sousZoneId: number;
        sousZoneName: string;
        zoneId: number;
        zoneName: string;
      }[] = [];

      for (const op of opsWithType) {
        // console.log(`Op: ${op.name}`);
        // if(op.point)
        ops.push({
          id: op.id,
          name: op.name,
          typeOpId: op.typeOp.id,
          typeOpName: op.typeOp.name,

          agenceId: op.point == null ? 0 : op.point.pointAgences[0].agence.id,
          agenceName:
            op.point == null ? '' : op.point.pointAgences[0].agence.name,

          pointId: op.point == null ? 0 : op.point.id,
          pointName: op.point == null ? '' : op.point.name,
          localiteId: op.localite == null ? 0 : op.localite.id,
          localiteName: op.localite == null ? '' : op.localite.name,
          sousZoneId:
            op.localite.sousZone == null ? 0 : op.localite.sousZone.id,
          sousZoneName:
            op.localite.sousZone == null ? '' : op.localite.sousZone.name,
          zoneId:
            op.localite.sousZone.zone == null
              ? 0
              : op.localite.sousZone.zone.id,
          zoneName:
            op.localite.sousZone.zone == null
              ? ''
              : op.localite.sousZone.zone.name,
        });
      }
      return ops;
    } catch (error) {
      throw new ForbiddenException(error);
    } finally {
      await this.prismaService.$disconnect();
    }
  }
  async getAllOpsCustomFromAgence(agenceId: number) {
    try {
      const opsWithType = await this.prismaService.op.findMany({
        include: {
          typeOp: true,
          point: {
            select: {
              id: true,
              name: true,
              pointAgences: {
                select: {
                  id: true,
                  agence: true,
                },
              },
            },
          },
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
        },
        where: {
          point: {
            pointAgences: {
              some: {
                agenceId: agenceId,
              },
            },
          },
        },
      });
      // return opsWithType;
      const ops: {
        id: number;
        name: string;
        typeOpId: number;
        typeOpName: string;
        pointId: number;
        pointName: string;
        agenceId: number;
        agenceName: string;
        localiteId: number;
        localiteName: string;
        sousZoneId: number;
        sousZoneName: string;
        zoneId: number;
        zoneName: string;
      }[] = [];

      for (const op of opsWithType) {
        // console.log(`Op: ${op.name}`);
        // if(op.point)
        ops.push({
          id: op.id,
          name: op.name,
          typeOpId: op.typeOp.id,
          typeOpName: op.typeOp.name,

          agenceId:
            op.point == null
              ? 0
              : op.point.pointAgences.filter((x) => x.agence.id == agenceId)[0]
                  .agence.id,

          agenceName:
            op.point == null
              ? ''
              : op.point.pointAgences.filter((x) => x.agence.id == agenceId)[0]
                  .agence.name,

          pointId: op.point == null ? 0 : op.point.id,
          pointName: op.point == null ? '' : op.point.name,
          localiteId: op.localite == null ? 0 : op.localite.id,
          localiteName: op.localite == null ? '' : op.localite.name,
          sousZoneId:
            op.localite.sousZone == null ? 0 : op.localite.sousZone.id,
          sousZoneName:
            op.localite.sousZone == null ? '' : op.localite.sousZone.name,
          zoneId:
            op.localite.sousZone.zone == null
              ? 0
              : op.localite.sousZone.zone.id,
          zoneName:
            op.localite.sousZone.zone == null
              ? ''
              : op.localite.sousZone.zone.name,
        });
      }
      return ops;
    } catch (error) {
      throw new ForbiddenException(error);
    } finally {
      await this.prismaService.$disconnect();
    }
  }

  async getAllOpsWithFilters(params: GetOpParamsDTO): Promise<IOp[]> {
    try {
      const { whereBuilder } = await applyFilters<Prisma.OpsViewWhereInput>({
        appliedFiltersInput: params,
        availableFilters: {
          agenceId: async ({ filter }) => {
            return {
              where: {
                pointAgenceId: {
                  in: (filter as string).split(',').map(Number),
                },
              },
            };
          },
          societeId: async ({ filter }) => {
            return {
              where: {
                pointAgenceSocieteId: {
                  equals: Number(filter),
                },
              },
            };
          },
          pointId: async ({ filter }) => {
            return {
              where: {
                pointId: {
                  in: (filter as string).split(',').map(Number),
                },
              },
            };
          },
          typeOpId: async ({ filter }) => {
            return {
              where: {
                typeOpId: {
                  in: (filter as string).split(',').map(Number),
                },
              },
            };
          },
          opId: async ({ filter }) => {
            return {
              where: {
                id: {
                  in: (filter as string).split(',').map(Number),
                },
              },
            };
          },
        },
      });

      const opWithFilters = await this.prismaService.opsView.findMany({
        where: whereBuilder,
      });

      const ops: IOp[] = [];

      for (const myOp of opWithFilters) {
        /*
        const allProducteurs = this.prismaService.producteur.findMany({
          where: { opId: myOp.id },
        });
        const mesProducteursCount = (await allProducteurs).length;
        const mesProducteurs = await allProducteurs;

        const allExploitations = this.prismaService.exploitation.findMany({
          where: { opId: myOp.id },
        });
        const mesExploitationsCount = (await allExploitations).length;
        const mesExploitations = await allExploitations;

        const allMouvementStocks = this.prismaService.mouvementStock.findMany({
          where: { opId: myOp.id },
        });
        const mesMouvementStocksCount = (await allMouvementStocks).length;
        const mesMouvementStocks = await allMouvementStocks;

        const allMouvementIntrants =
          this.prismaService.mouvementIntrant.findMany({
            where: { opId: myOp.id },
          });
        const mesMouvementIntrantCount = (await allMouvementStocks).length;
        const mesMouvementIntrants = await allMouvementStocks;
        */

        ops.push({
          id: myOp.id,
          name: myOp.name,
          sigle: myOp.sigle,
          email: myOp.email,
          telephone: myOp.telephone,
          adresse: myOp.adresse,
          prenom_contact: myOp.prenom_contact,
          nom_contact: myOp.nom_contact,
          email_contact: myOp.email_contact,
          telephone_contact: myOp.telephone_contact,
          typeOpId: myOp.typeOpId,
          typeOpName: myOp.typeOpName,
          villageId: myOp.villageId,
          villageName: myOp.villageName,
          localiteId: myOp.localiteId,
          localiteName: myOp.localiteName,
          sousZoneId: myOp.sousZoneId,
          sousZoneName: myOp.sousZoneName,
          zoneId: myOp.zoneId,
          zoneName: myOp.zoneName,

          pointId: myOp.pointId,
          pointName: myOp.pointName,
          agenceId: myOp.pointAgenceId,
          agenceName: myOp.pointAgenceName,
          agenceSigle: myOp.pointAgenceSigle,
          societeId: myOp.pointAgenceSocieteId,
          societeName: myOp.pointAgenceName,
          societeSigle: myOp.pointAgenceSigle,
        });
      }

      return ops;
    } catch (error) {
      throw new ForbiddenException(error);
    } finally {
      await this.prismaService.$disconnect();
    }
  }

  async getCustomAll() {
    try {
      const opsWithType = await this.prismaService.op.findMany({
        include: {
          typeOp: true,
          point: true,
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
        },
      });
      // return opsWithType;
      const ops: {
        id: number;
        name: string;
        typeOpId: number;
        typeOpName: string;
        pointId: number;
        pointName: string;
        localiteId: number;
        localiteName: string;
        sousZoneId: number;
        sousZoneName: string;
        zoneId: number;
        zoneName: string;
      }[] = [];

      for (const op of opsWithType) {
        // console.log(`Op: ${op.name}`);
        // if(op.point)
        ops.push({
          id: op.id,
          name: op.name,
          typeOpId: op.typeOp.id,
          typeOpName: op.typeOp.name,
          /*
                    pointId: op.point.id,
                    pointName: op.point.name,
                    localiteId: op.localite.id, 
                    localiteName: op.localite.name,  
                    sousZoneId: op.localite.sousZone.id,
                    sousZoneName: op.localite.sousZone.name,
                    zoneId: op.localite.sousZone.zone.id,
                    zoneName: op.localite.sousZone.zone.name,
                    */
          pointId: op.point == null ? 0 : op.point.id,
          pointName: op.point == null ? '' : op.point.name,
          localiteId: op.localite == null ? 0 : op.localite.id,
          localiteName: op.localite == null ? '' : op.localite.name,
          sousZoneId:
            op.localite.sousZone == null ? 0 : op.localite.sousZone.id,
          sousZoneName:
            op.localite.sousZone == null ? '' : op.localite.sousZone.name,
          zoneId:
            op.localite.sousZone.zone == null
              ? 0
              : op.localite.sousZone.zone.id,
          zoneName:
            op.localite.sousZone.zone == null
              ? ''
              : op.localite.sousZone.zone.name,
        });
      }
      return ops;
    } catch (error) {
      throw new ForbiddenException(error);
    } finally {
      await this.prismaService.$disconnect();
    }
  }
  async getAll() {
    return this.prismaService.op.findMany({
      select: {
        id: true,
        name: true,
        sigle: true,
        email: true,
        adresse: true,
        telephone: true,
        prenom_contact: true,
        nom_contact: true,
        email_contact: true,
        telephone_contact: true,

        typeOp: {
          select: {
            id: true,
            name: true,
          },
        },
        localite: {
          select: {
            id: true,
            name: true,
          },
        },
        village: {
          select: {
            id: true,
            name: true,
          },
        },
        point: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async getOne(opId: number) {
    const op = await this.prismaService.op.findUnique({ where: { id: opId } });
    if (!op) throw new NotFoundException('Post not found');
    return op;
  }
  async create(createOpDto: CreateOpDto) {
    const {
      name,
      sigle,
      email,
      telephone,
      adresse,
      prenom_contact,
      nom_contact,
      email_contact,
      telephone_contact,
      typeOpId,
      localiteId,
      pointId,
      villageId,
    } = createOpDto;
    await this.prismaService.op.create({
      data: {
        name,
        sigle,
        email,
        telephone,
        adresse,
        prenom_contact,
        nom_contact,
        email_contact,
        telephone_contact,
        typeOpId,
        localiteId,
        pointId,
        villageId,
      },
    });
    return { data: 'Op created' };
  }

  async update(opId: number, updateOpDto: UpdateOpDto) {
    const op = await this.prismaService.op.findUnique({ where: { id: opId } });
    if (!op) throw new NotFoundException('Op not found');
    await this.prismaService.op.update({
      where: { id: opId },
      data: { ...updateOpDto },
    });
    return { data: 'Op updeted!' };
  }

  async delete(opId: number) {
    const op = await this.prismaService.op.findUnique({ where: { id: opId } });
    if (!op) throw new NotFoundException('Post not found');
    await this.prismaService.op.delete({ where: { id: opId } });
    return { data: 'Op deleted' };
  }
}

interface IOp1 {
  id: number;
  name: string;
  typeOpId: number;
  typeOpName: string;
}
