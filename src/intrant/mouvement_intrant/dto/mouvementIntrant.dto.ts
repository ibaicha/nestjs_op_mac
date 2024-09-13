import { Saison } from './../../../../node_modules/.prisma/client/index.d';
import { Controller, Get, Query } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';

export interface IMouvementIntrant {
  id: number;
  date: string;
  pu: number;
  quantiteEntreeEmballage: number;
  quantiteSortieEmballage: number;
  quantiteEntreeSortieEmballage: number;
  nombreUnite: number;
  valeur: number;
  lot: string;

  chargeExploitationId: number;
  chargeExploitationName: string;
  chargeExploitationUniteGrandeurId: number;
  chargeExploitationUniteGrandeurName: string;

  modeEntreeSortieIntrantId: number;
  modeEntreeSortieIntrantName: string;

  anneeId: number;
  anneeName: string;
  anneeValeur: number;

  saisonId: number;
  saisonName: string;
  saisonDescription: string;

  emballageIntrantId: number;
  emballageIntrantName: string;

  opId: number;

  opName: string;
  opSigle: string;

  fournisseurId: number;
  fournisseurName: string;
  fournisseurSigle: string;

  partenaireId: number;
  partenaireName: string;
  partenaireSigle: string;

  emplacementId: number;
  emplacementName: string;
  entrepotId: number;
  entrepotName: string;
  pointId: number;
  pointName: string;

  emplacementSourceId: number;
  emplacementSourceName: string;
  entrepotSourceId: number;
  entrepotSourceName: string;
  pointSourceId: number;
  pointSourceName: string;

  emplacementDestinationId: number;
  emplacementDestinationName: string;
  entrepotDestinationId: number;
  entrepotDestinationName: string;
  pointDestinationId: number;
  pointDestinationName: string;
}

export class GetMouvementIntrantParamsDTO {
  anneeId?: number;
  saisonId?: number;
  emplacementId?: number;
  chargeExploitationId?: number;
  opId?: number;
  fournisseurId?: number;
  lot?: string;
  pointId?: number;
}

export class CreateMouvementIntrantDto {
  @IsNotEmpty()
  readonly date: Date;
  @IsNotEmpty()
  readonly pu: number;
  @IsNotEmpty()
  readonly quantiteEntreeEmballage: number;
  @IsNotEmpty()
  readonly quantiteSortieEmballage: number;
  @IsNotEmpty()
  readonly nombreUnite: number;
  @IsNotEmpty()
  readonly valeur: number;
  readonly lot: string;
  readonly opId: number;
  readonly fournisseurId: number;
  @IsNotEmpty()
  readonly chargeExploitationId: number;
  @IsNotEmpty()
  readonly modeEntreeSortieIntrantId: number;
  @IsNotEmpty()
  readonly emplacementId: number;
  @IsNotEmpty()
  readonly emplacementSourceId: number;
  @IsNotEmpty()
  readonly emplacementDestinationId: number;
  @IsNotEmpty()
  readonly emballageIntrantId: number;
  @IsNotEmpty()
  readonly anneeId: number;
  @IsNotEmpty()
  readonly saisonId: number;
}

export class UpdateMouvementIntrantDto {
  @IsNotEmpty()
  readonly date: Date;
  @IsNotEmpty()
  readonly pu: number;
  @IsNotEmpty()
  readonly quantiteEntreeEmballage: number;
  @IsNotEmpty()
  readonly quantiteSortieEmballage: number;
  @IsNotEmpty()
  readonly nombreUnite: number;
  @IsNotEmpty()
  readonly valeur: number;
  readonly lot: string;
  readonly opId: number;
  readonly fournisseurId: number;
  @IsNotEmpty()
  readonly chargeExploitationId: number;
  @IsNotEmpty()
  readonly modeEntreeSortieStockId: number;
  @IsNotEmpty()
  readonly emplacementId: number;
  @IsNotEmpty()
  readonly emplacementSourceId: number;
  @IsNotEmpty()
  readonly emplacementDestinationId: number;
  @IsNotEmpty()
  readonly emballageIntrantId: number;
  @IsNotEmpty()
  readonly anneeId: number;
  @IsNotEmpty()
  readonly saisonId: number;
}
