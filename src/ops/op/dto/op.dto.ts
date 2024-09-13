import { IsNotEmpty } from 'class-validator';

export class CreateOpDto {
  @IsNotEmpty()
  readonly name: string;

  readonly sigle: string;
  readonly email: string;
  readonly telephone: string;
  readonly adresse: string;
  readonly prenom_contact: string;
  readonly nom_contact: string;
  readonly email_contact: string;
  readonly telephone_contact: string;

  @IsNotEmpty()
  readonly typeOpId: number;
  @IsNotEmpty()
  readonly localiteId: number;
  @IsNotEmpty()
  readonly pointId: number;
  @IsNotEmpty()
  readonly villageId: number;
}

export class UpdateOpDto {
  @IsNotEmpty()
  readonly name: string;
  readonly sigle: string;
  readonly email: string;
  readonly telephone: string;
  readonly adresse: string;
  readonly prenom_contact: string;
  readonly nom_contact: string;
  readonly email_contact: string;
  readonly telephone_contact: string;

  @IsNotEmpty()
  readonly typeOpId: number;
  @IsNotEmpty()
  readonly localiteId: number;
  @IsNotEmpty()
  readonly pointId: number;
  @IsNotEmpty()
  readonly villageId: number;
}

export class GetOpParamsDTO {
  societeId?: number;
  agenceId?: number;
  pointId?: number;
  typeOpId?: number;
  opId?: number;
}

export interface IOp {
  id: number;
  name: string;
  sigle: string;
  email: string;
  telephone: string;
  adresse: string;
  prenom_contact: string;
  nom_contact: string;
  email_contact: string;
  telephone_contact: string;
  typeOpId: number;
  typeOpName: string;

  villageId: number;
  villageName: string;
  localiteId: number;
  localiteName: string;
  sousZoneId: number;
  sousZoneName: string;
  zoneId: number;
  zoneName: string;

  pointId: number;
  pointName: string;
  agenceId: number;
  agenceName: string;
  agenceSigle: string;
  societeId: number;
  societeName: string;
  societeSigle: string;
}
