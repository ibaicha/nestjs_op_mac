import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { applyFilters } from 'src/utils/filters';
import { Prisma } from '@prisma/client';
import {
  CreateMouvementIntrantDto,
  GetMouvementIntrantParamsDTO,
  IMouvementIntrant,
  UpdateMouvementIntrantDto,
} from './dto/mouvementIntrant.dto';
import { isNumber } from 'class-validator';

@Injectable()
export class MouvementIntrantService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.mouvementIntrant.findMany({
      select: {
        id: true,
        date: true,
        pu: true,
        quantiteEntreeEmballage: true,
        quantiteSortieEmballage: true,
        nombreUnite: true,
        valeur: true,
        chargeExploitation: {
          select: {
            id: true,
            name: true,
          },
        },
        annee: {
          select: {
            id: true,
            name: true,
            valeur: true,
          },
        },
        saison: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
        /*
                    emballage: {
                        select: {
                            name: true,
                            conditionnement: true,
                            quantite: true,
                            pu: true,
                            valeur: true,
                            isActive: true,
                            isDefault: true
                        }
                    },
                    */

        op: {
          select: {
            id: true,
            name: true,
          },
        },
        fournisseur: {
          select: {
            id: true,
            name: true,
          },
        },
        emplacement: {
          select: {
            id: true,
            name: true,
          },
        },
        emplacementSource: {
          select: {
            id: true,
            name: true,
          },
        },
        emplacementDestination: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
  async getAllMouvementIntrantCampagneOpFournisseur(
    anneeId: number,
    saisonId: number,
    chargeExploitationId?: number,
    opId?: number,
    fournisseurId?: number,
  ) {
    return this.prismaService.mouvementIntrant.findMany({
      select: {
        id: true,
        date: true,
        pu: true,
        quantiteEntreeEmballage: true,
        quantiteSortieEmballage: true,
        nombreUnite: true,
        valeur: true,

        chargeExploitation: {
          select: {
            id: true,
            name: true,
          },
        },
        modeEntreeSortieIntrant: {
          select: {
            id: true,
            name: true,
          },
        },
        annee: {
          select: {
            id: true,
            name: true,
            valeur: true,
          },
        },
        saison: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },

        emballageIntrant: {
          select: {
            id: true,
            name: true,
            conditionnement: true,
            quantite: true,
            pu: true,
            valeur: true,
            isActive: true,
            isDefault: true,
          },
        },

        op: {
          select: {
            id: true,
            name: true,
          },
        },
        fournisseur: {
          select: {
            id: true,
            name: true,
          },
        },
        emplacement: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      where: {
        anneeId: anneeId,
        saisonId: saisonId,
        chargeExploitationId: chargeExploitationId,
        opId: opId,
        fournisseurId: fournisseurId,
      },
    });
  }

  arrayToString(arr: any[], delimiter: string = ','): string {
    return arr.join(delimiter);
  }

  removeFirstAndLastCharacter(str: string): string {
    if (str.length <= 2) {
      return '';
    }
    return str.substring(1, str.length - 1);
  }
  
  async getAllMouvementIntrantWithFilters(
    params: GetMouvementIntrantParamsDTO,
  ): Promise<IMouvementIntrant[]> {
    try {
      const { whereBuilder } =
        await applyFilters<Prisma.MouvementsIntrantViewWhereInput>({
          appliedFiltersInput: params,
          availableFilters: {
            anneeId: async ({ filter }) => {
              return {
                where: {
                  anneeId: {
                    in: (filter as string).split(',').map(Number),
                  },
                },
              };
            },

            saisonId: async ({ filter }) => {
              return {
                where: {
                  saisonId: {
                    in: (filter as string).split(',').map(Number),
                  },
                },
              };
            },
            emplacementId: async ({ filter }) => {
              return {
                where: {
                  emplacementId: {
                    in: (filter as string).split(',').map(Number),
                  },
                },
              };
            },
            chargeExploitationId: async ({ filter }) => {
              return {
                where: {
                  chargeExploitationId: {
                    in: (filter as string).split(',').map(Number),
                  },
                },
              };
            },

            opId: async ({ filter }) => {
              return {
                where: {
                  opId: {
                    in: (filter as string).split(',').map(Number),
                  },
                },
              };
            },

            fournisseurId: async ({ filter }) => {
              return {
                where: {
                  fournisseurId: {
                    in: (filter as string).split(',').map(Number),
                  },
                },
              };
            },
            /*
            pointId: async ({ filter }) => {
              return {
                where: {
                  pointId: {
                    in: (filter as string).split(',').map(Number),
                  },
                },
              };
            },
            */

            lot: async ({ filter }) => {
              return {
                where: {
                  lot: {
                    in: (filter as string).split(',').map(String),
                  },
                },
              };
            },
          },
        });

      const mouvementIntrantWithFilters =
      await this.prismaService.mouvementsIntrantView.findMany({
        where: whereBuilder,
      });

        
      const mouvementIntrants: IMouvementIntrant[] = [];

      for (const myMouvement of mouvementIntrantWithFilters) {
        const dateObjectMouvementIntrant = new Date(myMouvement.date);
        const formattedDateMouvementIntrant =
          dateObjectMouvementIntrant.toLocaleDateString('fr-FR');

        mouvementIntrants.push({
          id: myMouvement.id,
          date: formattedDateMouvementIntrant,
          pu: myMouvement.pu,
          quantiteEntreeEmballage: myMouvement.quantiteEntreeEmballage,
          quantiteSortieEmballage: myMouvement.quantiteSortieEmballage,

          quantiteEntreeSortieEmballage:
            myMouvement.quantiteEntreeEmballage != 0
              ? myMouvement.quantiteEntreeEmballage
              : myMouvement.quantiteSortieEmballage,

          nombreUnite: myMouvement.nombreUnite,
          valeur: myMouvement.valeur,
          lot: myMouvement.lot,
          modeEntreeSortieIntrantId: myMouvement.modeEntreeSortieIntrantId,
          modeEntreeSortieIntrantName: myMouvement.modeEntreeSortieIntrantName,
          chargeExploitationId: myMouvement.chargeExploitationId,
          chargeExploitationName: myMouvement.chargeExploitationName,
          chargeExploitationUniteGrandeurId:
            myMouvement.chargeExploitationUniteGrandeurId,
          chargeExploitationUniteGrandeurName:
            myMouvement.chargeExploitationUniteGrandeurName,
          anneeId: myMouvement.anneeId,
          anneeName: myMouvement.anneeName,
          anneeValeur: myMouvement.anneeValeur,
          saisonId: myMouvement.saisonId,
          saisonName: myMouvement.saisonName,
          saisonDescription: myMouvement.SaisonDescription,

          emballageIntrantId: myMouvement.emballageIntrantId,
          emballageIntrantName: myMouvement.emballageIntrantName,

          opId: myMouvement.opId != null ? myMouvement.opId : 0, //myMouvement.op.id,
          opName: myMouvement.opName != null ? myMouvement.opName : '', // myMouvement.op.name,
          opSigle: myMouvement.opSigle != null ? myMouvement.opSigle : '', //myMouvement.op.sigle,

          fournisseurId:
            myMouvement.fournisseurId != null ? myMouvement.fournisseurId : 0,
          fournisseurName:
            myMouvement.fournisseurName != null ? myMouvement.fournisseurName : '',
          fournisseurSigle:
            myMouvement.fournisseurSigle != null
              ? myMouvement.fournisseurSigle
              : '',

          partenaireId:
            myMouvement.fournisseurId == null && myMouvement.opId == null
              ? 0
              : myMouvement.fournisseurId == null && myMouvement.opId != null
              ? myMouvement.opId
              : myMouvement.fournisseurId != null && myMouvement.opId == null
              ? myMouvement.fournisseurId
              : 0,
          partenaireName:
            myMouvement.fournisseurName == null && myMouvement.opName == null
              ? ''
              : myMouvement.fournisseurName == null && myMouvement.opName != null
              ? myMouvement.opName
              : myMouvement.fournisseurName != null && myMouvement.opName == null
              ? myMouvement.fournisseurName
              : '',
          partenaireSigle:
            myMouvement.fournisseurSigle == null && myMouvement.opSigle == null
              ? ''
              : myMouvement.fournisseurSigle == null && myMouvement.opSigle != null
              ? myMouvement.opSigle
              : myMouvement.fournisseurSigle != null && myMouvement.opSigle == null
              ? myMouvement.fournisseurSigle
              : '',

          emplacementId: myMouvement.emplacementId,
          emplacementName: myMouvement.emplacementName,
          entrepotId: myMouvement.entrepotId,
          entrepotName: myMouvement.entrepotName,
          pointId: myMouvement.pointId,
          pointName: myMouvement.pointName,

          emplacementSourceId: myMouvement.emplacementSourceId,
          emplacementSourceName: myMouvement.emplacementSourceName,
          entrepotSourceId: myMouvement.entrepotId,
          entrepotSourceName: myMouvement.entrepotName,
          pointSourceId: myMouvement.pointId,
          pointSourceName: myMouvement.pointName,

          emplacementDestinationId: myMouvement.emplacementDestinationId,
          emplacementDestinationName: myMouvement.emplacementDestinationName,
          entrepotDestinationId: myMouvement.entrepotDestinationId,
          entrepotDestinationName:
            myMouvement.entrepotDestinationName,
          pointDestinationId:
            myMouvement.pointDestinationId,
          pointDestinationName:
            myMouvement.pointDestinationName,
        });
      }

      return mouvementIntrants;
    } catch (error) {
      throw new ForbiddenException(error);
    } finally {
      await this.prismaService.$disconnect();
    }
  }
  async getAllMouvementIntrantWithFiltersX(
    params: GetMouvementIntrantParamsDTO,
  ): Promise<IMouvementIntrant[]> {
    try {
      const { whereBuilder } =
        await applyFilters<Prisma.MouvementIntrantWhereInput>({
          appliedFiltersInput: params,
          availableFilters: {
            anneeId: async ({ filter }) => {
              return {
                where: {
                  anneeId: {
                    in: (filter as string).split(',').map(Number),
                  },
                },
              };
            },

            saisonId: async ({ filter }) => {
              return {
                where: {
                  saisonId: {
                    in: (filter as string).split(',').map(Number),
                  },
                },
              };
            },
            emplacementId: async ({ filter }) => {
              return {
                where: {
                  emplacementId: {
                    in: (filter as string).split(',').map(Number),
                  },
                },
              };
            },
            chargeExploitationId: async ({ filter }) => {
              return {
                where: {
                  chargeExploitationId: {
                    in: (filter as string).split(',').map(Number),
                  },
                },
              };
            },

            opId: async ({ filter }) => {
              return {
                where: {
                  opId: {
                    in: (filter as string).split(',').map(Number),
                  },
                },
              };
            },

            fournisseurId: async ({ filter }) => {
              return {
                where: {
                  fournisseurId: {
                    in: (filter as string).split(',').map(Number),
                  },
                },
              };
            },
            /*
            pointId: async ({ filter }) => {
              return {
                where: {
                  pointId: {
                    in: (filter as string).split(',').map(Number),
                  },
                },
              };
            },
            */

            lot: async ({ filter }) => {
              return {
                where: {
                  lot: {
                    in: (filter as string).split(',').map(String),
                  },
                },
              };
            },
          },
        });

      const mouvementIntrantWithFilters =
        await this.prismaService.mouvementIntrant.findMany({
          include: {
            annee: true,
            saison: true,
            emballageIntrant: true,
            op: true,
            fournisseur: true,
            emplacement: {
              include: {
                entrepot: {
                  include: {
                    point: true,
                  },
                },
              },
            },
            emplacementSource: {
              include: {
                entrepot: {
                  include: {
                    point: true,
                  },
                },
              },
            },
            emplacementDestination: {
              include: {
                entrepot: {
                  include: {
                    point: true,
                  },
                },
              },
            },
            chargeExploitation: {
              include: {
                uniteGrandeur: true,
              },
            },
            modeEntreeSortieIntrant: true,
          },

          where: whereBuilder,
        });

      const mouvementIntrants: IMouvementIntrant[] = [];

      for (const myMouvement of mouvementIntrantWithFilters) {
        const dateObjectMouvementIntrant = new Date(myMouvement.date);
        const formattedDateMouvementIntrant =
          dateObjectMouvementIntrant.toLocaleDateString('fr-FR');

        mouvementIntrants.push({
          id: myMouvement.id,
          date: formattedDateMouvementIntrant,
          pu: myMouvement.pu,
          quantiteEntreeEmballage: myMouvement.quantiteEntreeEmballage,
          quantiteSortieEmballage: myMouvement.quantiteSortieEmballage,

          quantiteEntreeSortieEmballage:
            myMouvement.quantiteEntreeEmballage != 0
              ? myMouvement.quantiteEntreeEmballage
              : myMouvement.quantiteSortieEmballage,

          nombreUnite: myMouvement.nombreUnite,
          valeur: myMouvement.valeur,
          lot: myMouvement.lot,
          modeEntreeSortieIntrantId: myMouvement.modeEntreeSortieIntrant.id,
          modeEntreeSortieIntrantName: myMouvement.modeEntreeSortieIntrant.name,
          chargeExploitationId: myMouvement.chargeExploitation.id,
          chargeExploitationName: myMouvement.chargeExploitation.name,
          chargeExploitationUniteGrandeurId:
            myMouvement.chargeExploitation.uniteGrandeur.id,
          chargeExploitationUniteGrandeurName:
            myMouvement.chargeExploitation.uniteGrandeur.name,
          anneeId: myMouvement.annee.id,
          anneeName: myMouvement.annee.name,
          anneeValeur: myMouvement.annee.valeur,
          saisonId: myMouvement.saison.id,
          saisonName: myMouvement.saison.name,
          saisonDescription: myMouvement.saison.description,

          emballageIntrantId: myMouvement.emballageIntrant.id,
          emballageIntrantName: myMouvement.emballageIntrant.name,

          opId: myMouvement.op != null ? myMouvement.op.id : 0, //myMouvement.op.id,
          opName: myMouvement.op != null ? myMouvement.op.name : '', // myMouvement.op.name,
          opSigle: myMouvement.op != null ? myMouvement.op.sigle : '', //myMouvement.op.sigle,

          fournisseurId:
            myMouvement.fournisseur != null ? myMouvement.fournisseur.id : 0,
          fournisseurName:
            myMouvement.fournisseur != null ? myMouvement.fournisseur.name : '',
          fournisseurSigle:
            myMouvement.fournisseur != null
              ? myMouvement.fournisseur.sigle
              : '',

          partenaireId:
            myMouvement.fournisseur == null && myMouvement.op == null
              ? 0
              : myMouvement.fournisseur == null && myMouvement.op != null
              ? myMouvement.op.id
              : myMouvement.fournisseur != null && myMouvement.op == null
              ? myMouvement.fournisseur.id
              : 0,
          partenaireName:
            myMouvement.fournisseur == null && myMouvement.op == null
              ? ''
              : myMouvement.fournisseur == null && myMouvement.op != null
              ? myMouvement.op.name
              : myMouvement.fournisseur != null && myMouvement.op == null
              ? myMouvement.fournisseur.name
              : '',
          partenaireSigle:
            myMouvement.fournisseur == null && myMouvement.op == null
              ? ''
              : myMouvement.fournisseur == null && myMouvement.op != null
              ? myMouvement.op.sigle
              : myMouvement.fournisseur != null && myMouvement.op == null
              ? myMouvement.fournisseur.sigle
              : '',

          emplacementId: myMouvement.emplacement.id,
          emplacementName: myMouvement.emplacement.name,
          entrepotId: myMouvement.emplacement.entrepot.id,
          entrepotName: myMouvement.emplacement.entrepot.name,
          pointId: myMouvement.emplacement.entrepot.point.id,
          pointName: myMouvement.emplacement.entrepot.point.name,

          emplacementSourceId: myMouvement.emplacementSource.id,
          emplacementSourceName: myMouvement.emplacementSource.name,
          entrepotSourceId: myMouvement.emplacementSource.entrepot.id,
          entrepotSourceName: myMouvement.emplacementSource.entrepot.name,
          pointSourceId: myMouvement.emplacementSource.entrepot.point.id,
          pointSourceName: myMouvement.emplacementSource.entrepot.point.name,

          emplacementDestinationId: myMouvement.emplacementDestination.id,
          emplacementDestinationName: myMouvement.emplacementDestination.name,
          entrepotDestinationId: myMouvement.emplacementDestination.entrepot.id,
          entrepotDestinationName:
            myMouvement.emplacementDestination.entrepot.name,
          pointDestinationId:
            myMouvement.emplacementDestination.entrepot.point.id,
          pointDestinationName:
            myMouvement.emplacementDestination.entrepot.point.name,
        });
      }

      return mouvementIntrants;
    } catch (error) {
      throw new ForbiddenException(error);
    } finally {
      await this.prismaService.$disconnect();
    }
  }

  /*
  async getAllMouvementIntrantWithFiltersLast(
    params: GetMouvementIntrantParamsDTO,
  ) {
    try {
      const { whereBuilder } =
        await applyFilters<Prisma.MouvementIntrantWhereInput>({
          appliedFiltersInput: params,
          availableFilters: {
            anneeId: async ({ filter }) => {
              return {
                where: {
                  anneeId: {
                    equals: Number(filter),
                  },
                },
              };
            },

            saisonId: async ({ filter }) => {
              if (typeof filter === 'string') {
                return {
                  where: {
                    saisonId: {
                      in: (filter as string).split(',').map(Number),
                    },
                  },
                };
              }
            },
            emplacementId: async ({ filter }) => {
              return {
                where: {
                  emplacementId: {
                    equals: parseInt(filter as string),
                  },
                },
              };
            },
            chargeExploitationId: async ({ filter }) => {
              return {
                where: {
                  chargeExploitationId: {
                    equals: parseInt(filter as string),
                  },
                },
              };
            },

            opId: async ({ filter }) => {
              return {
                where: {
                  opId: {
                    equals: parseInt(filter as string),
                  },
                },
              };
            },

            fournisseurId: async ({ filter }) => {
              return {
                where: {
                  fournisseurId: {
                    equals: 2, //parseInt(filter as string),
                  },
                },
              };
            },
          },
        });
      const mouvementIntrantWithFilters =
        await this.prismaService.mouvementIntrant.findMany({
          select: {
            id: true,
            date: true,
            pu: true,
            quantiteEntreeEmballage: true,
            quantiteSortieEmballage: true,
            nombreUnite: true,
            valeur: true,
            modeEntreeSortieIntrant: {
              select: {
                id: true,
                name: true,
              },
            },
            chargeExploitation: {
              select: {
                id: true,
                name: true,
              },
            },
            annee: {
              select: {
                id: true,
                name: true,
                valeur: true,
              },
            },
            saison: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },

            op: {
              select: {
                id: true,
                name: true,
                sigle: true,
              },
            },
            fournisseur: {
              select: {
                id: true,
                name: true,
                sigle: true,
              },
            },
            emplacement: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          where: whereBuilder,
        });

      const mouvementIntrants: {
        id: number;
        date: string;
        pu: number;
        quantiteEntreeEmballage: number;
        quantiteSortieEmballage: number;
        nombreUnite: number;
        valeur: number;

        chargeExploitationId: number;
        chargeExploitationName: string;

        modeEntreeSortieIntrantId: number;
        modeEntreeSortieIntrantName: string;

        anneeId: number;
        anneeName: string;
        anneeValeur: number;

        saisonId: number;
        saisonName: string;
        saisonDescription: string;

        opId: number;
        opName: string;
        opSigle: string;

        fournisseurId: number;
        fournisseurName: string;
        fournisseurSigle: string;

        emplacementId: number;
        emplacementName: string;

        emplacementSourceId: number;
        emplacementSourceName: string;

        emplacementDestinationId: number;
        emplacementDestinationName: string;
      }[] = [];

      for (const mouvement of mouvementIntrantWithFilters) {
        const dateObjectMouvementIntrant = new Date(mouvement.date);
        const formattedDateMouvementIntrant =
          dateObjectMouvementIntrant.toLocaleDateString('fr-FR');

        mouvementIntrants.push({
          id: mouvement.id,
          date: formattedDateMouvementIntrant,
          pu: mouvement.pu,
          quantiteEntreeEmballage: mouvement.quantiteEntreeEmballage,
          quantiteSortieEmballage: mouvement.quantiteSortieEmballage,
          nombreUnite: mouvement.nombreUnite,
          valeur: mouvement.valeur,
          modeEntreeSortieIntrantId: mouvement.modeEntreeSortieIntrant.id,
          modeEntreeSortieIntrantName: mouvement.modeEntreeSortieIntrant.name,
          chargeExploitationId: mouvement.chargeExploitation.id,
          chargeExploitationName: mouvement.chargeExploitation.name,
          anneeId: mouvement.annee.id,
          anneeName: mouvement.annee.name,
          anneeValeur: mouvement.annee.valeur,
          saisonId: mouvement.saison.id,
          saisonName: mouvement.saison.name,
          saisonDescription: mouvement.saison.description,
          opId: mouvement.op.id,
          opName: mouvement.op.name,
          opSigle: mouvement.op.sigle,
          fournisseurId: mouvement.fournisseur.id,
          fournisseurName: mouvement.fournisseur.name,
          fournisseurSigle: mouvement.fournisseur.sigle,
          emplacementId: mouvement.fournisseur.id,
          emplacementName: mouvement.fournisseur.name,
          emplacementSourceId: mouvement.fournisseur.id,
          emplacementSourceName: mouvement.fournisseur.name,
          emplacementDestinationId: mouvement.fournisseur.id,
          emplacementDestinationName: mouvement.fournisseur.name,
        });
      }
      // return mouvementIntrants;
      return mouvementIntrantWithFilters;
    } catch (error) {
      throw new ForbiddenException(error);
    } finally {
      await this.prismaService.$disconnect();
    }
  }
 

  async getAllMouvementIntrantWithFiltersx(
    params: GetMouvementIntrantParamsDTO,
  ) {
    const { whereBuilder } =
      await applyFilters<Prisma.MouvementIntrantWhereInput>({
        appliedFiltersInput: params,
        availableFilters: {
          anneeId: async ({ filter }) => {
            return {
              where: {
                anneeId: {
                  equals: Number(filter),
                },
              },
            };
          },

          saisonId: async ({ filter }) => {
            return {
              where: {
                saisonId: {
                  equals: parseInt(filter as string),
                },
              },
            };
          },
          emplacementId: async ({ filter }) => {
            return {
              where: {
                emplacementId: {
                  equals: parseInt(filter as string),
                },
              },
            };
          },
          chargeExploitationId: async ({ filter }) => {
            return {
              where: {
                chargeExploitationId: {
                  equals: parseInt(filter as string),
                },
              },
            };
          },

          opId: async ({ filter }) => {
            return {
              where: {
                opId: {
                  equals: parseInt(filter as string),
                },
              },
            };
          },

          fournisseurId: async ({ filter }) => {
            return {
              where: {
                fournisseurId: {
                  equals: 2, //parseInt(filter as string),
                },
              },
            };
          },
        },
      });
    return this.prismaService.mouvementIntrant.findMany({
      select: {
        id: true,
        date: true,
        pu: true,
        quantiteEntreeEmballage: true,
        quantiteSortieEmballage: true,
        nombreUnite: true,
        valeur: true,

        chargeExploitation: {
          select: {
            id: true,
            name: true,
          },
        },
        annee: {
          select: {
            id: true,
            name: true,
            valeur: true,
          },
        },
        saison: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },

        op: {
          select: {
            id: true,
            name: true,
          },
        },
        fournisseur: {
          select: {
            id: true,
            name: true,
          },
        },
        emplacement: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      where: whereBuilder,
    });
  }
 */
  async getMouvementsIntrants(filters: Prisma.MouvementIntrantWhereInput) {
    const prismaFilters: Prisma.MouvementIntrantWhereInput = {
      ...filters,
      fournisseurId: filters.fournisseurId
        ? Number(filters.fournisseurId)
        : undefined,
    };
    return this.prismaService.mouvementIntrant.findMany({
      where: filters,
    });
  }

  async getOne(mouvementIntrantId: number) {
    return this.prismaService.mouvementIntrant.findMany({
      select: {
        id: true,
        date: true,
        pu: true,
        quantiteEntreeEmballage: true,
        quantiteSortieEmballage: true,
        nombreUnite: true,
        valeur: true,

        emballageIntrant: {
          select: {
            name: true,
            conditionnement: true,
            quantite: true,
            pu: true,
            valeur: true,
            isActive: true,
            isDefault: true,
          },
        },

        chargeExploitation: {
          select: {
            id: true,
            name: true,
          },
        },
        op: {
          select: {
            id: true,
            name: true,
          },
        },
        fournisseur: {
          select: {
            id: true,
            name: true,
          },
        },
        emplacement: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      where: { id: mouvementIntrantId },
    });
  }

  async create(createMouvementIntrantDto: CreateMouvementIntrantDto) {
    const {
      date,
      pu,
      quantiteEntreeEmballage,
      quantiteSortieEmballage,
      nombreUnite,
      valeur,
      lot,
      opId,
      fournisseurId,
      chargeExploitationId,
      modeEntreeSortieIntrantId,
      emplacementId,
      emplacementSourceId,
      emplacementDestinationId,
      emballageIntrantId,
      anneeId,
      saisonId,
    } = createMouvementIntrantDto;
    await this.prismaService.mouvementIntrant.create({
      data: {
        date,
        pu,
        quantiteEntreeEmballage,
        quantiteSortieEmballage,
        nombreUnite,
        valeur,
        lot,
        opId,
        fournisseurId,
        chargeExploitationId,
        modeEntreeSortieIntrantId,
        emplacementId,
        emplacementSourceId,
        emplacementDestinationId,
        emballageIntrantId,
        anneeId,
        saisonId,
      },
    });
    return { data: 'MouvementIntrant created' };
  }

  async update(
    mouvementIntrantId: number,
    updateMouvementIntrantDto: UpdateMouvementIntrantDto,
  ) {
    const mouvementIntrant =
      await this.prismaService.mouvementIntrant.findUnique({
        where: { id: mouvementIntrantId },
      });
    if (!mouvementIntrant)
      throw new NotFoundException('MouvementIntrant not found');
    await this.prismaService.mouvementIntrant.update({
      where: { id: mouvementIntrantId },
      data: { ...updateMouvementIntrantDto },
    });
    return { data: 'MouvementIntrant updeted!' };
  }

  async delete(mouvementIntrantId: number) {
    const mouvementIntrant =
      await this.prismaService.mouvementIntrant.findUnique({
        where: { id: mouvementIntrantId },
      });
    if (!mouvementIntrant) throw new NotFoundException('Post not found');
    await this.prismaService.mouvementIntrant.delete({
      where: { id: mouvementIntrantId },
    });
    return { data: 'MouvementIntrant deleted' };
  }
}
