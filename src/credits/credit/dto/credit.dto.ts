import { Exploitation } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CreateCreditDto {
  @IsNotEmpty()
  readonly date: Date;
  @IsNotEmpty()
  readonly capital: number;
  @IsNotEmpty()
  readonly interet: number;
  @IsNotEmpty()
  readonly moratoire: number;
  @IsNotEmpty()
  readonly autres_engagements: number;

  @IsNotEmpty()
  readonly exploitationId: number;
}

export class UpdateCreditDto {
  @IsNotEmpty()
  readonly date: Date;
  @IsNotEmpty()
  readonly capital: number;
  @IsNotEmpty()
  readonly interet: number;
  @IsNotEmpty()
  readonly moratoire: number;
  @IsNotEmpty()
  readonly autres_engagements: number;

  @IsNotEmpty()
  readonly exploitationId: number;
}

export class CreateExploitationCreditDto {
  @IsNotEmpty()
  date: Date;
  @IsNotEmpty()
  capital: number;
  @IsNotEmpty()
  interet: number;
  @IsNotEmpty()
  moratoire: number;
  @IsNotEmpty()
  autres_engagements: number;
  @IsNotEmpty()
  exploitationId: number;
  /* */

  compte: number;
  @IsNotEmpty()
  dateExploitation: Date;
  @IsNotEmpty()
  unite: string;
  @IsNotEmpty()
  surface: number;
  @IsNotEmpty()
  readonly agenceId: number;
  @IsNotEmpty()
  varieteId: number;
  @IsNotEmpty()
  anneeId: number;
  @IsNotEmpty()
  saisonId: number;
  producteurId: number;
  opId: number;
}

export class GetCreditParamsDTO {
  societeId?: number;
  agenceId?: number;
  anneeId?: number;
  saisonId?: number;
  opId?: number;
}

export interface ICredit {
  id: number;
  dateCredit: string;
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
  societeId: number;
  societeName: string;
  societeSigle: string;

  exploitationId: number;
  exploitationOpId: number;
  exploitationOpName: string;

  exploitationOpPointId: number;
  exploitationOpPointName: string;

  exploitationOpPointAgenceId: number;
  exploitationOpPointAgenceName: string;
  exploitationOpPointAgenceSigle: string;

  exploitationOpPointAgenceSocieteId: number;
  exploitationOpPointAgenceSocieteName: string;
  exploitationOpPointAgenceSocieteSigle: string;

  exploitationTypeOpId: number;
  exploitationTypeOpName: string;

  exploitationAnneeId: number;
  exploitationAnneeName: string;
  exploitationSaisonId: number;
  exploitationSaisonName: string;

  exploitationVarieteId: number;
  exploitationVarieteName: string;
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

  remboursementsSum: number;
  remboursementsSumFormat: string;
  remboursementsCount: number;
  tauxRemboursement: number;
  tauxRemboursementFormat: string;

  remboursementsMouvementSum: number;
  remboursementsMouvementCount: number;
  remboursementsMouvementSumFormat: string;

  tauxRemboursementMouvement: number;
  tauxRemboursementMouvementFormat: string;
}
