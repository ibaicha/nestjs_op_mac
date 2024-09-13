import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateExploitationDto } from '../../exploitations/exploitation/dto/exploitation.dto';

import {
  CreateCreditDto,
  CreateExploitationCreditDto,
  GetCreditParamsDTO,
  ICredit,
  UpdateCreditDto,
} from './dto/credit.dto';
import { applyFilters } from 'src/utils/filters';
import { Prisma, Op } from '@prisma/client';
import { ExploitationChargeExploitationController } from 'src/exploitations/exploitation_charge_exploitation/exploitation_charge_exploitation.controller';

@Injectable()
export class CreditService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.credit.findMany({
      select: {
        id: true,
        date: true,
        capital: true,
        interet: true,
        moratoire: true,
        autres_engagements: true,

        exploitation: {
          select: {
            id: true,
            compte: true,
            date: true,
            unite: true,
            //pu: true,
            surface: true,
            //production: true,
            agence: true,
            annee: true,
            saison: true,
            createdAt: true,
            updatedAt: true,
            remboursements: {
              include: {},
            },
          },
        },
      },
    });
  }

  async getAllCreditsFromExploitation(exploitationId: number) {
    return this.prismaService.credit.findMany({
      select: {
        id: true,
        date: true,
        capital: true,
        interet: true,
        moratoire: true,
        autres_engagements: true,

        exploitation: {
          select: {
            id: true,
            compte: true,
            date: true,
            unite: true,
            //pu: true,
            surface: true,
            //production: true,
            createdAt: true,
            updatedAt: true,
            remboursements: {
              include: {},
            },
          },
        },
      },
      where: {
        exploitation: {
          id: exploitationId,
        },
      },
    });
  }

  formatMontant(montant: number) {
    return montant.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA';
  }

  async getAllCustom() {
    try {
      const creditWithExploitation = await this.prismaService.credit.findMany({
        include: {
          exploitation: {
            include: {
              agence: {
                include: {
                  societe: true,
                },
              },
              op: {
                include: {
                  point: true,
                  typeOp: true,
                },
              },
              annee: true,
              saison: true,
              variete: {
                include: {
                  produit: {
                    include: {
                      filiere: {
                        include: {},
                      },
                      familleEmplacement: {
                        include: {},
                      },
                    },
                  },
                },
              },
              remboursements: {
                include: {},
              },
            },
          },
        },
      });
      // return opsWithType;
      const credits: {
        id: number;
        date: string;
        capital: number;
        interet: number;
        moratoire: number;
        autres_engagements: number;
        exigible: number;
        remboursementsSum: number;
        tauxRemboursement: number;
        capitalFormat: string;
        interetFormat: string;
        moratoireFormat: string;
        autres_engagementsFormat: string;
        exigibleFormat: string;
        remboursementsSumFormat: string;
        tauxRemboursementFormat: string;
        agenceId: number;
        agenceName: string;
        agenceSigle: string;
        societeId: number;
        societeName: string;
        societeSigle: string;
        exploitationId: number;
        exploitationOpId: number;
        exploitationOpName: string;
        exploitationOpPointCollecteId: number;
        exploitationOpPointCollecteName: string;
        exploitationTypeOpId: number;
        exploitationTypeOpName: string;
        exploitationAnneeId: number;
        exploitationAnneeName: string;
        exploitationSaisonId: number;
        exploitationSaisonName: string;
        exploitationVarieteId: number;
        exploitationVarieteName: string;
        exploitationVarieteSurfaceUnite: string;
        exploitationVarieteQuantiteUnite: string;
        exploitationVarieteRendementUnite: number;
        exploitationProduitId: number;
        exploitationProduitName: string;
        exploitationFiliereId: number;
        exploitationFiliereName: string;
        exploitationFamilleEmplacemenId: number;
        exploitationFamilleEmplacementName: string;
        exploitationCompte: number;
        exploitationDate: string;
        exploitationUnite: string;
        exploitationSurface: number;
      }[] = [];

      for (const credit of creditWithExploitation) {
        const dateObjectCredit = new Date(credit.date);
        const formattedDateCredit =
          dateObjectCredit.toLocaleDateString('fr-FR');
        const dateObjectExploitation = new Date(credit.exploitation.date);
        const formattedDateExploitation =
          dateObjectExploitation.toLocaleDateString('fr-FR');
        const mesRemboursements = credit.exploitation.remboursements.reduce(
          (sum, remboursement) => sum + remboursement.valeur,
          0,
        );
        const exigible =
          credit.capital +
          credit.interet +
          credit.moratoire +
          credit.autres_engagements;
        let monTauxRemboursement = 0;
        if (exigible > 0) {
          monTauxRemboursement = (mesRemboursements / exigible) * 100;
        }

        credits.push({
          id: credit.id,
          date: formattedDateCredit,
          capital: credit.capital,
          interet: credit.interet,
          moratoire: credit.moratoire,
          exigible: exigible,
          autres_engagements: credit.autres_engagements,
          capitalFormat: this.formatMontant(credit.capital),
          interetFormat: this.formatMontant(credit.interet),
          moratoireFormat: this.formatMontant(credit.moratoire),
          exigibleFormat: this.formatMontant(exigible),
          autres_engagementsFormat: this.formatMontant(
            credit.autres_engagements,
          ),
          agenceId: credit.exploitation.agence.id,
          agenceName: credit.exploitation.agence.name,
          agenceSigle: credit.exploitation.agence.sigle,

          societeId: credit.exploitation.agence.societe.id,
          societeName: credit.exploitation.agence.societe.name,
          societeSigle: credit.exploitation.agence.societe.sigle,
          exploitationTypeOpId: credit.exploitation.op.typeOp.id,
          exploitationTypeOpName: credit.exploitation.op.typeOp.name,
          exploitationId: credit.exploitation.id,
          exploitationOpId: credit.exploitation.op.id,
          exploitationOpName: credit.exploitation.op.name,
          exploitationOpPointCollecteId: credit.exploitation.op.point.id,
          exploitationOpPointCollecteName: credit.exploitation.op.point.name,
          exploitationAnneeId: credit.exploitation.annee.id,
          exploitationAnneeName: credit.exploitation.annee.name,
          exploitationSaisonId: credit.exploitation.saison.id,
          exploitationSaisonName: credit.exploitation.saison.name,
          exploitationVarieteId: credit.exploitation.variete.id,
          exploitationVarieteName: credit.exploitation.variete.name,
          exploitationVarieteSurfaceUnite:
            credit.exploitation.variete.surface_unite,
          exploitationVarieteQuantiteUnite:
            credit.exploitation.variete.quantite_unite,
          exploitationVarieteRendementUnite:
            credit.exploitation.variete.rendement_unite,
          exploitationProduitId: credit.exploitation.variete.produit.id,
          exploitationProduitName: credit.exploitation.variete.produit.name,
          exploitationFiliereId: credit.exploitation.variete.produit.filiere.id,
          exploitationFiliereName:
            credit.exploitation.variete.produit.filiere.name,
          exploitationFamilleEmplacemenId:
            credit.exploitation.variete.produit.familleEmplacement.id,
          exploitationFamilleEmplacementName:
            credit.exploitation.variete.produit.familleEmplacement.name,
          exploitationCompte: credit.exploitation.compte,
          exploitationDate: formattedDateExploitation,
          exploitationUnite: credit.exploitation.unite,
          exploitationSurface: credit.exploitation.surface,
          remboursementsSum: mesRemboursements,
          remboursementsSumFormat: this.formatMontant(mesRemboursements),
          tauxRemboursement: monTauxRemboursement,
          tauxRemboursementFormat: monTauxRemboursement.toFixed(2) + ' %',
        });
      }
      return credits;
    } catch (error) {
      throw new ForbiddenException(error);
    } finally {
      await this.prismaService.$disconnect();
    }
  }

  async getAllCustomCreditToOp(opId: number) {
    try {
      const creditWithExploitation = await this.prismaService.credit.findMany({
        include: {
          exploitation: {
            include: {
              agence: {
                include: {
                  societe: true,
                },
              },
              op: {
                include: {
                  point: true,
                  typeOp: true,
                },
              },
              annee: true,
              saison: true,
              variete: {
                include: {
                  produit: {
                    include: {
                      filiere: {
                        include: {},
                      },
                      familleEmplacement: {
                        include: {},
                      },
                    },
                  },
                },
              },
            },
          },
        },
        where: {
          exploitation: {
            opId: opId,
          },
        },
      });
      // return opsWithType;
      const credits: {
        id: number;
        date: string;
        capital: number;
        interet: number;
        moratoire: number;
        autres_engagements: number;
        exigible: number;
        capitalFormat: string;
        interetFormat: string;
        moratoireFormat: string;
        autres_engagementsFormat: string;
        exigibleFormat: string;
        agenceId: number;
        agenceName: string;
        agenceSigle: string;
        exploitationId: number;
        exploitationOpId: number;
        exploitationOpName: string;
        exploitationOpPointCollecteId: number;
        exploitationOpPointCollecteName: string;
        exploitationTypeOpId: number;
        exploitationTypeOpName: string;
        exploitationAnneeId: number;
        exploitationAnneeName: string;
        exploitationSaisonId: number;
        exploitationSaisonName: string;
        exploitationVarieteId: number;
        exploitationVarieteName: string;
        exploitationVarieteSurfaceUnite: string;
        exploitationVarieteQuantiteUnite: string;
        exploitationVarieteRendementUnite: number;
        exploitationProduitId: number;
        exploitationProduitName: string;
        exploitationFiliereId: number;
        exploitationFiliereName: string;
        exploitationFamilleEmplacemenId: number;
        exploitationFamilleEmplacementName: string;
        exploitationCompte: number;
        exploitationDate: string;
        exploitationUnite: string;
        exploitationSurface: number;
      }[] = [];

      for (const credit of creditWithExploitation) {
        const dateObjectCredit = new Date(credit.date);
        const formattedDateCredit =
          dateObjectCredit.toLocaleDateString('fr-FR');

        const dateObjectExploitation = new Date(credit.exploitation.date);
        const formattedDateExploitation =
          dateObjectExploitation.toLocaleDateString('fr-FR');

        credits.push({
          id: credit.id,
          date: formattedDateCredit,
          capital: credit.capital,
          interet: credit.interet,
          moratoire: credit.moratoire,
          exigible:
            credit.capital +
            credit.interet +
            credit.moratoire +
            credit.autres_engagements,
          autres_engagements: credit.autres_engagements,
          capitalFormat: this.formatMontant(credit.capital),
          interetFormat: this.formatMontant(credit.interet),
          moratoireFormat: this.formatMontant(credit.moratoire),
          exigibleFormat: this.formatMontant(
            credit.capital +
              credit.interet +
              credit.moratoire +
              credit.autres_engagements,
          ),
          autres_engagementsFormat: this.formatMontant(
            credit.autres_engagements,
          ),
          agenceId: credit.exploitation.agence.id,
          agenceName: credit.exploitation.agence.name,
          agenceSigle: credit.exploitation.agence.sigle,
          exploitationTypeOpId: credit.exploitation.op.typeOp.id,
          exploitationTypeOpName: credit.exploitation.op.typeOp.name,
          exploitationId: credit.exploitation.id,
          exploitationOpId: credit.exploitation.op.id,
          exploitationOpName: credit.exploitation.op.name,
          exploitationOpPointCollecteId: credit.exploitation.op.point.id,
          exploitationOpPointCollecteName: credit.exploitation.op.point.name,
          exploitationAnneeId: credit.exploitation.annee.id,
          exploitationAnneeName: credit.exploitation.annee.name,
          exploitationSaisonId: credit.exploitation.saison.id,
          exploitationSaisonName: credit.exploitation.saison.name,
          exploitationVarieteId: credit.exploitation.variete.id,
          exploitationVarieteName: credit.exploitation.variete.name,
          exploitationVarieteSurfaceUnite:
            credit.exploitation.variete.surface_unite,
          exploitationVarieteQuantiteUnite:
            credit.exploitation.variete.quantite_unite,
          exploitationVarieteRendementUnite:
            credit.exploitation.variete.rendement_unite,
          exploitationProduitId: credit.exploitation.variete.produit.id,
          exploitationProduitName: credit.exploitation.variete.produit.name,
          exploitationFiliereId: credit.exploitation.variete.produit.filiere.id,
          exploitationFiliereName:
            credit.exploitation.variete.produit.filiere.name,
          exploitationFamilleEmplacemenId:
            credit.exploitation.variete.produit.familleEmplacement.id,
          exploitationFamilleEmplacementName:
            credit.exploitation.variete.produit.familleEmplacement.name,
          exploitationCompte: credit.exploitation.compte,
          exploitationDate: formattedDateExploitation,
          exploitationUnite: credit.exploitation.unite,
          exploitationSurface: credit.exploitation.surface,
        });
      }
      return credits;
    } catch (error) {
      throw new ForbiddenException(error);
    } finally {
      await this.prismaService.$disconnect();
    }
  }

  async getAllCustomCreditAgenceEtablissementVarieteAnneeSaisonBonToSave(
    agenceEtablissementId: number,
    produitId: number,
    anneeId: number,
    saisonId: number,
  ) {
    try {
      const creditWithExploitation = await this.prismaService.credit.findMany({
        include: {
          exploitation: {
            include: {
              agence: {
                include: {
                  societe: true,
                },
              },
              op: {
                include: {
                  point: true,
                  typeOp: true,
                },
              },
              annee: true,
              saison: true,
              variete: {
                include: {
                  produit: {
                    include: {
                      filiere: {
                        include: {},
                      },
                      familleEmplacement: {
                        include: {},
                      },
                    },
                  },
                },
              },
              remboursements: {
                include: {},
              },
            },
          },
        },
        where: {
          exploitation: {
            agence: {
              //societeId: opId
              id: agenceEtablissementId,
            },
            op: {
              //pointId: opId,
            },
            variete: {
              produitId: produitId,
            },
            anneeId: anneeId,
            saisonId: saisonId,
          },
        },
      });
      // return opsWithType;
      const credits: {
        id: number;
        date: string;
        capital: number;
        interet: number;
        moratoire: number;
        autres_engagements: number;
        exigible: number;
        remboursementsSum: number;
        tauxRemboursement: number;
        capitalFormat: string;
        interetFormat: string;
        moratoireFormat: string;
        autres_engagementsFormat: string;
        exigibleFormat: string;
        remboursementsSumFormat: string;
        tauxRemboursementFormat: string;
        agenceId: number;
        agenceName: string;
        agenceSigle: string;
        societeId: number;
        societeName: string;
        societeSigle: string;
        exploitationId: number;
        exploitationOpId: number;
        exploitationOpName: string;
        exploitationOpPointCollecteId: number;
        exploitationOpPointCollecteName: string;
        exploitationTypeOpId: number;
        exploitationTypeOpName: string;
        exploitationAnneeId: number;
        exploitationAnneeName: string;
        exploitationSaisonId: number;
        exploitationSaisonName: string;
        exploitationVarieteId: number;
        exploitationVarieteName: string;
        exploitationVarieteSurfaceUnite: string;
        exploitationVarieteQuantiteUnite: string;
        exploitationVarieteRendementUnite: number;
        exploitationProduitId: number;
        exploitationProduitName: string;
        exploitationFiliereId: number;
        exploitationFiliereName: string;
        exploitationFamilleEmplacemenId: number;
        exploitationFamilleEmplacementName: string;
        exploitationCompte: number;
        exploitationDate: string;
        exploitationUnite: string;
        exploitationSurface: number;
      }[] = [];

      for (const credit of creditWithExploitation) {
        const dateObjectCredit = new Date(credit.date);
        const formattedDateCredit =
          dateObjectCredit.toLocaleDateString('fr-FR');
        const dateObjectExploitation = new Date(credit.exploitation.date);
        const formattedDateExploitation =
          dateObjectExploitation.toLocaleDateString('fr-FR');
        const mesRemboursements = credit.exploitation.remboursements.reduce(
          (sum, remboursement) => sum + remboursement.valeur,
          0,
        );
        const exigible =
          credit.capital +
          credit.interet +
          credit.moratoire +
          credit.autres_engagements;
        let monTauxRemboursement = 0;
        if (exigible > 0) {
          monTauxRemboursement = (mesRemboursements / exigible) * 100;
        }

        credits.push({
          id: credit.id,
          date: formattedDateCredit,
          capital: credit.capital,
          interet: credit.interet,
          moratoire: credit.moratoire,
          exigible: exigible,
          autres_engagements: credit.autres_engagements,
          capitalFormat: this.formatMontant(credit.capital),
          interetFormat: this.formatMontant(credit.interet),
          moratoireFormat: this.formatMontant(credit.moratoire),
          exigibleFormat: this.formatMontant(exigible),
          autres_engagementsFormat: this.formatMontant(
            credit.autres_engagements,
          ),
          agenceId: credit.exploitation.agence.id,
          agenceName: credit.exploitation.agence.name,
          agenceSigle: credit.exploitation.agence.sigle,

          societeId: credit.exploitation.agence.societe.id,
          societeName: credit.exploitation.agence.societe.name,
          societeSigle: credit.exploitation.agence.societe.sigle,
          exploitationTypeOpId: credit.exploitation.op.typeOp.id,
          exploitationTypeOpName: credit.exploitation.op.typeOp.name,
          exploitationId: credit.exploitation.id,
          exploitationOpId: credit.exploitation.op.id,
          exploitationOpName: credit.exploitation.op.name,
          exploitationOpPointCollecteId: credit.exploitation.op.point.id,
          exploitationOpPointCollecteName: credit.exploitation.op.point.name,
          exploitationAnneeId: credit.exploitation.annee.id,
          exploitationAnneeName: credit.exploitation.annee.name,
          exploitationSaisonId: credit.exploitation.saison.id,
          exploitationSaisonName: credit.exploitation.saison.name,
          exploitationVarieteId: credit.exploitation.variete.id,
          exploitationVarieteName: credit.exploitation.variete.name,
          exploitationVarieteSurfaceUnite:
            credit.exploitation.variete.surface_unite,
          exploitationVarieteQuantiteUnite:
            credit.exploitation.variete.quantite_unite,
          exploitationVarieteRendementUnite:
            credit.exploitation.variete.rendement_unite,
          exploitationProduitId: credit.exploitation.variete.produit.id,
          exploitationProduitName: credit.exploitation.variete.produit.name,
          exploitationFiliereId: credit.exploitation.variete.produit.filiere.id,
          exploitationFiliereName:
            credit.exploitation.variete.produit.filiere.name,
          exploitationFamilleEmplacemenId:
            credit.exploitation.variete.produit.familleEmplacement.id,
          exploitationFamilleEmplacementName:
            credit.exploitation.variete.produit.familleEmplacement.name,
          exploitationCompte: credit.exploitation.compte,
          exploitationDate: formattedDateExploitation,
          exploitationUnite: credit.exploitation.unite,
          exploitationSurface: credit.exploitation.surface,
          remboursementsSum: mesRemboursements,
          remboursementsSumFormat: this.formatMontant(mesRemboursements),
          tauxRemboursement: monTauxRemboursement,
          tauxRemboursementFormat: monTauxRemboursement.toFixed(2) + ' %',
        });
      }
      return credits;
    } catch (error) {
      throw new ForbiddenException(error);
    } finally {
      await this.prismaService.$disconnect();
    }
  }

  async getAllCustomCreditAgenceEtablissementVarieteAnneeSaison(
    agenceEtablissementId: number,
    produitId: number,
    anneeId: number,
    saisonId: number,
  ) {
    try {
      const creditWithExploitation = await this.prismaService.credit.findMany({
        include: {
          exploitation: {
            include: {
              agence: {
                include: {
                  societe: true,
                },
              },
              op: {
                include: {
                  point: true,
                  typeOp: true,
                  movementsStocks: {
                    where: {
                      variete: {
                        produitId: produitId,
                      },
                      anneeId: anneeId,
                      saisonId: saisonId,
                    },
                  },
                },
              },
              annee: true,
              saison: true,
              variete: {
                include: {
                  produit: {
                    include: {
                      filiere: {
                        include: {},
                      },
                      familleEmplacement: {
                        include: {},
                      },
                    },
                  },
                },
              },
              remboursements: {
                include: {},
              },
            },
          },
        },
        where: {
          exploitation: {
            agence: {
              //societeId: opId
              id: agenceEtablissementId,
            },
            op: {
              //pointId: opId,
            },
            variete: {
              produitId: produitId,
            },
            anneeId: anneeId,
            saisonId: saisonId,
          },
        },
      });
      // return opsWithType;
      const credits: {
        id: number;
        date: string;
        capital: number;
        interet: number;
        moratoire: number;
        autres_engagements: number;
        exigible: number;
        remboursementsSum: number;
        remboursementsCount: number;
        tauxRemboursement: number;
        remboursementsMouvementSum: number;
        remboursementsMouvementCount: number;
        tauxRemboursementMouvement: number;
        capitalFormat: string;
        interetFormat: string;
        moratoireFormat: string;
        autres_engagementsFormat: string;
        exigibleFormat: string;
        remboursementsSumFormat: string;
        tauxRemboursementFormat: string;
        remboursementsMouvementSumFormat: string;
        tauxRemboursementMouvementFormat: string;
        agenceId: number;
        agenceName: string;
        agenceSigle: string;
        societeId: number;
        societeName: string;
        societeSigle: string;
        exploitationId: number;
        exploitationOpId: number;
        exploitationOpName: string;
        exploitationOpPointCollecteId: number;
        exploitationOpPointCollecteName: string;
        exploitationTypeOpId: number;
        exploitationTypeOpName: string;
        exploitationAnneeId: number;
        exploitationAnneeName: string;
        exploitationSaisonId: number;
        exploitationSaisonName: string;
        exploitationVarieteId: number;
        exploitationVarieteName: string;
        exploitationVarieteSurfaceUnite: string;
        exploitationVarieteQuantiteUnite: string;
        exploitationVarieteRendementUnite: number;
        exploitationProduitId: number;
        exploitationProduitName: string;
        exploitationFiliereId: number;
        exploitationFiliereName: string;
        exploitationFamilleEmplacemenId: number;
        exploitationFamilleEmplacementName: string;
        exploitationCompte: number;
        exploitationDate: string;
        exploitationUnite: string;
        exploitationSurface: number;
      }[] = [];

      for (const credit of creditWithExploitation) {
        const dateObjectCredit = new Date(credit.date);
        const formattedDateCredit =
          dateObjectCredit.toLocaleDateString('fr-FR');
        const dateObjectExploitation = new Date(credit.exploitation.date);
        const formattedDateExploitation =
          dateObjectExploitation.toLocaleDateString('fr-FR');

        const mesRemboursementsCount =
          credit.exploitation.remboursements.length;

        const mesRemboursements = credit.exploitation.remboursements.reduce(
          (sum, remboursement) => sum + remboursement.valeur,
          0,
        );

        const mesRemboursementsMouvementCount =
          credit.exploitation.op.movementsStocks.length;
        const mesRemboursementsMouvement =
          credit.exploitation.op.movementsStocks.reduce(
            (sum, mouvement) => sum + mouvement.valeur,
            0,
          );
        const exigible =
          credit.capital +
          credit.interet +
          credit.moratoire +
          credit.autres_engagements;
        let monTauxRemboursement = 0;
        if (exigible > 0) {
          monTauxRemboursement = (mesRemboursements / exigible) * 100;
        }

        let monTauxRemboursementMouvement = 0;
        if (exigible > 0) {
          monTauxRemboursementMouvement =
            (mesRemboursementsMouvement / exigible) * 100;
        }

        credits.push({
          id: credit.id,
          date: formattedDateCredit,
          capital: credit.capital,
          interet: credit.interet,
          moratoire: credit.moratoire,
          exigible: exigible,
          autres_engagements: credit.autres_engagements,
          capitalFormat: this.formatMontant(credit.capital),
          interetFormat: this.formatMontant(credit.interet),
          moratoireFormat: this.formatMontant(credit.moratoire),
          exigibleFormat: this.formatMontant(exigible),
          autres_engagementsFormat: this.formatMontant(
            credit.autres_engagements,
          ),
          agenceId: credit.exploitation.agence.id,
          agenceName: credit.exploitation.agence.name,
          agenceSigle: credit.exploitation.agence.sigle,

          societeId: credit.exploitation.agence.societe.id,
          societeName: credit.exploitation.agence.societe.name,
          societeSigle: credit.exploitation.agence.societe.sigle,
          exploitationTypeOpId: credit.exploitation.op.typeOp.id,
          exploitationTypeOpName: credit.exploitation.op.typeOp.name,
          exploitationId: credit.exploitation.id,
          exploitationOpId: credit.exploitation.op.id,
          exploitationOpName: credit.exploitation.op.name,
          exploitationOpPointCollecteId: credit.exploitation.op.point.id,
          exploitationOpPointCollecteName: credit.exploitation.op.point.name,
          exploitationAnneeId: credit.exploitation.annee.id,
          exploitationAnneeName: credit.exploitation.annee.name,
          exploitationSaisonId: credit.exploitation.saison.id,
          exploitationSaisonName: credit.exploitation.saison.name,
          exploitationVarieteId: credit.exploitation.variete.id,
          exploitationVarieteName: credit.exploitation.variete.name,
          exploitationVarieteSurfaceUnite:
            credit.exploitation.variete.surface_unite,
          exploitationVarieteQuantiteUnite:
            credit.exploitation.variete.quantite_unite,
          exploitationVarieteRendementUnite:
            credit.exploitation.variete.rendement_unite,
          exploitationProduitId: credit.exploitation.variete.produit.id,
          exploitationProduitName: credit.exploitation.variete.produit.name,
          exploitationFiliereId: credit.exploitation.variete.produit.filiere.id,
          exploitationFiliereName:
            credit.exploitation.variete.produit.filiere.name,
          exploitationFamilleEmplacemenId:
            credit.exploitation.variete.produit.familleEmplacement.id,
          exploitationFamilleEmplacementName:
            credit.exploitation.variete.produit.familleEmplacement.name,
          exploitationCompte: credit.exploitation.compte,
          exploitationDate: formattedDateExploitation,
          exploitationUnite: credit.exploitation.unite,
          exploitationSurface: credit.exploitation.surface,
          remboursementsSum: mesRemboursements,
          remboursementsSumFormat: this.formatMontant(mesRemboursements),
          remboursementsCount: mesRemboursementsCount,
          tauxRemboursement: monTauxRemboursement,
          tauxRemboursementFormat: monTauxRemboursement.toFixed(2) + ' %',

          remboursementsMouvementSum: mesRemboursementsMouvement,
          remboursementsMouvementCount: mesRemboursementsMouvementCount,
          remboursementsMouvementSumFormat: this.formatMontant(
            mesRemboursementsMouvement,
          ),
          tauxRemboursementMouvement: monTauxRemboursementMouvement,
          tauxRemboursementMouvementFormat:
            monTauxRemboursementMouvement.toFixed(2) + ' %',
        });
      }

      return credits;
    } catch (error) {
      throw new ForbiddenException(error);
    } finally {
      await this.prismaService.$disconnect();
    }
  }

  async getAllCustomCreditEtablissementVarieteAnneeSaison(
    etablissementId: number,
    produitId: number,
    anneeId: number,
    saisonId: number,
  ) {
    try {
      const creditWithExploitation = await this.prismaService.credit.findMany({
        include: {
          exploitation: {
            include: {
              agence: {
                include: {
                  societe: true,
                },
              },
              op: {
                include: {
                  point: true,
                  typeOp: true,
                  movementsStocks: {
                    where: {
                      variete: {
                        produitId: produitId,
                      },
                      anneeId: anneeId,
                      saisonId: saisonId,
                    },
                  },
                },
              },
              annee: true,
              saison: true,
              variete: {
                include: {
                  produit: {
                    include: {
                      filiere: {
                        include: {},
                      },
                      familleEmplacement: {
                        include: {},
                      },
                    },
                  },
                },
              },
              remboursements: {
                include: {},
              },
            },
          },
        },
        where: {
          exploitation: {
            agence: {
              societeId: etablissementId,
            },
            variete: {
              produitId: produitId,
            },
            anneeId: anneeId,
            saisonId: saisonId,
          },
        },
      });
      // return opsWithType;
      const credits: {
        id: number;
        date: string;
        capital: number;
        interet: number;
        moratoire: number;
        autres_engagements: number;
        exigible: number;
        remboursementsSum: number;
        remboursementsCount: number;
        tauxRemboursement: number;
        remboursementsMouvementSum: number;
        remboursementsMouvementCount: number;
        tauxRemboursementMouvement: number;
        capitalFormat: string;
        interetFormat: string;
        moratoireFormat: string;
        autres_engagementsFormat: string;
        exigibleFormat: string;
        remboursementsSumFormat: string;
        tauxRemboursementFormat: string;
        remboursementsMouvementSumFormat: string;
        tauxRemboursementMouvementFormat: string;
        agenceId: number;
        agenceName: string;
        agenceSigle: string;
        societeId: number;
        societeName: string;
        societeSigle: string;
        exploitationId: number;
        exploitationOpId: number;
        exploitationOpName: string;
        exploitationOpPointCollecteId: number;
        exploitationOpPointCollecteName: string;
        exploitationTypeOpId: number;
        exploitationTypeOpName: string;
        exploitationAnneeId: number;
        exploitationAnneeName: string;
        exploitationSaisonId: number;
        exploitationSaisonName: string;
        exploitationVarieteId: number;
        exploitationVarieteName: string;
        exploitationVarieteSurfaceUnite: string;
        exploitationVarieteQuantiteUnite: string;
        exploitationVarieteRendementUnite: number;
        exploitationProduitId: number;
        exploitationProduitName: string;
        exploitationFiliereId: number;
        exploitationFiliereName: string;
        exploitationFamilleEmplacemenId: number;
        exploitationFamilleEmplacementName: string;
        exploitationCompte: number;
        exploitationDate: string;
        exploitationUnite: string;
        exploitationSurface: number;
      }[] = [];

      for (const credit of creditWithExploitation) {
        const dateObjectCredit = new Date(credit.date);
        const formattedDateCredit =
          dateObjectCredit.toLocaleDateString('fr-FR');
        const dateObjectExploitation = new Date(credit.exploitation.date);
        const formattedDateExploitation =
          dateObjectExploitation.toLocaleDateString('fr-FR');
        const mesRemboursementsCount =
          credit.exploitation.remboursements.length;

        const mesRemboursements = credit.exploitation.remboursements.reduce(
          (sum, remboursement) => sum + remboursement.valeur,
          0,
        );

        const mesRemboursementsMouvementCount =
          credit.exploitation.op.movementsStocks.length;
        const mesRemboursementsMouvement =
          credit.exploitation.op.movementsStocks.reduce(
            (sum, mouvement) => sum + mouvement.valeur,
            0,
          );
        const exigible =
          credit.capital +
          credit.interet +
          credit.moratoire +
          credit.autres_engagements;
        let monTauxRemboursement = 0;
        if (exigible > 0) {
          monTauxRemboursement = (mesRemboursements / exigible) * 100;
        }

        let monTauxRemboursementMouvement = 0;
        if (exigible > 0) {
          monTauxRemboursementMouvement =
            (mesRemboursementsMouvement / exigible) * 100;
        }

        credits.push({
          id: credit.id,
          date: formattedDateCredit,
          capital: credit.capital,
          interet: credit.interet,
          moratoire: credit.moratoire,
          exigible: exigible,
          autres_engagements: credit.autres_engagements,
          capitalFormat: this.formatMontant(credit.capital),
          interetFormat: this.formatMontant(credit.interet),
          moratoireFormat: this.formatMontant(credit.moratoire),
          exigibleFormat: this.formatMontant(exigible),
          autres_engagementsFormat: this.formatMontant(
            credit.autres_engagements,
          ),
          agenceId: credit.exploitation.agence.id,
          agenceName: credit.exploitation.agence.name,
          agenceSigle: credit.exploitation.agence.sigle,

          societeId: credit.exploitation.agence.societe.id,
          societeName: credit.exploitation.agence.societe.name,
          societeSigle: credit.exploitation.agence.societe.sigle,
          exploitationTypeOpId: credit.exploitation.op.typeOp.id,
          exploitationTypeOpName: credit.exploitation.op.typeOp.name,
          exploitationId: credit.exploitation.id,
          exploitationOpId: credit.exploitation.op.id,
          exploitationOpName: credit.exploitation.op.name,
          exploitationOpPointCollecteId: credit.exploitation.op.point.id,
          exploitationOpPointCollecteName: credit.exploitation.op.point.name,
          exploitationAnneeId: credit.exploitation.annee.id,
          exploitationAnneeName: credit.exploitation.annee.name,
          exploitationSaisonId: credit.exploitation.saison.id,
          exploitationSaisonName: credit.exploitation.saison.name,
          exploitationVarieteId: credit.exploitation.variete.id,
          exploitationVarieteName: credit.exploitation.variete.name,
          exploitationVarieteSurfaceUnite:
            credit.exploitation.variete.surface_unite,
          exploitationVarieteQuantiteUnite:
            credit.exploitation.variete.quantite_unite,
          exploitationVarieteRendementUnite:
            credit.exploitation.variete.rendement_unite,
          exploitationProduitId: credit.exploitation.variete.produit.id,
          exploitationProduitName: credit.exploitation.variete.produit.name,
          exploitationFiliereId: credit.exploitation.variete.produit.filiere.id,
          exploitationFiliereName:
            credit.exploitation.variete.produit.filiere.name,
          exploitationFamilleEmplacemenId:
            credit.exploitation.variete.produit.familleEmplacement.id,
          exploitationFamilleEmplacementName:
            credit.exploitation.variete.produit.familleEmplacement.name,
          exploitationCompte: credit.exploitation.compte,
          exploitationDate: formattedDateExploitation,
          exploitationUnite: credit.exploitation.unite,
          exploitationSurface: credit.exploitation.surface,
          remboursementsSum: mesRemboursements,
          remboursementsSumFormat: this.formatMontant(mesRemboursements),
          remboursementsCount: mesRemboursementsCount,
          tauxRemboursement: monTauxRemboursement,
          tauxRemboursementFormat: monTauxRemboursement.toFixed(2) + ' %',

          remboursementsMouvementSum: mesRemboursementsMouvement,
          remboursementsMouvementCount: mesRemboursementsMouvementCount,
          remboursementsMouvementSumFormat: this.formatMontant(
            mesRemboursementsMouvement,
          ),
          tauxRemboursementMouvement: monTauxRemboursementMouvement,
          tauxRemboursementMouvementFormat:
            monTauxRemboursementMouvement.toFixed(2) + ' %',
        });
      }
      return credits;
    } catch (error) {
      throw new ForbiddenException(error);
    } finally {
      await this.prismaService.$disconnect();
    }
  }

  async getLastCompte(anneeId: number, saisonId: number, varieteId: number) {
    const credit = await this.prismaService.exploitation.findMany({
      where: {
        anneeId: anneeId,
        saisonId: saisonId,
        varieteId: varieteId,
      },
      orderBy: {
        compte: 'desc',
      },
      take: 1,
    });
    let compteValue = 0;
    if (credit.length > 0) {
      compteValue = credit[0].compte;
      compteValue = compteValue + 1;
    } else {
      compteValue = parseInt(
        anneeId.toString() +
          saisonId.toString() +
          varieteId.toString() +
          '00001',
        10,
      );
    }
    console.log('compteValue:', compteValue);
    return compteValue;
  }

  async getOne(creditId: number) {
    const credit = await this.prismaService.credit.findUnique({
      where: { id: creditId },
    });
    if (!credit) throw new NotFoundException('Post not found');
    return credit;
  }
  async create(createCreditDto: CreateCreditDto) {
    const {
      date,
      capital,
      interet,
      moratoire,
      autres_engagements,

      exploitationId,
    } = createCreditDto;
    await this.prismaService.credit.create({
      data: {
        date,
        capital,
        interet,
        moratoire,
        autres_engagements,

        exploitationId,
      },
    });
    return { data: 'Credit created' };
  }

  async createExploitation(createExploitationDto: CreateExploitationDto) {
    const {
      date,
      unite,
      surface,
      agenceId,
      varieteId,
      anneeId,
      saisonId,
      compte = await this.getLastCompte(anneeId, saisonId, varieteId),
      producteurId,
      opId,
    } = createExploitationDto;
    return await this.prismaService.exploitation.create({
      data: {
        compte,
        date,
        unite,
        surface,
        agenceId,
        varieteId,
        anneeId,
        saisonId,
        producteurId,
        opId,
      },
    });
  }
  async createExploitationCredit(
    createExploitationCreditDto: CreateExploitationCreditDto,
  ) {
    const CreateExploitationDto: CreateExploitationDto = {
      compte: createExploitationCreditDto.compte,
      date: createExploitationCreditDto.dateExploitation,
      unite: createExploitationCreditDto.unite,
      surface: createExploitationCreditDto.surface,
      agenceId: createExploitationCreditDto.agenceId,
      varieteId: createExploitationCreditDto.varieteId,
      anneeId: createExploitationCreditDto.anneeId,
      saisonId: createExploitationCreditDto.saisonId,
      producteurId: createExploitationCreditDto.producteurId,
      opId: createExploitationCreditDto.opId,
    };
    const myExploitation = this.createExploitation(CreateExploitationDto);
    createExploitationCreditDto.exploitationId = (await myExploitation).id;

    const {
      date,
      capital,
      interet,
      moratoire,
      autres_engagements,
      exploitationId,
    } = createExploitationCreditDto;
    await this.prismaService.credit.create({
      data: {
        date,
        capital,
        interet,
        moratoire,
        autres_engagements,
        exploitationId,
      },
    });
    return { data: 'Credit created' };
  }

  async update(creditId: number, updateCreditDto: UpdateCreditDto) {
    const credit = await this.prismaService.credit.findUnique({
      where: { id: creditId },
    });
    if (!credit) throw new NotFoundException('Credit not found');
    await this.prismaService.credit.update({
      where: { id: creditId },
      data: { ...updateCreditDto },
    });
    return { data: 'Credit updeted!' };
  }

  async delete(creditId: number) {
    const credit = await this.prismaService.credit.findUnique({
      where: { id: creditId },
    });
    if (!credit) throw new NotFoundException('Post not found');
    await this.prismaService.credit.delete({ where: { id: creditId } });
    return { data: 'Credit deleted' };
  }
}
