import { Exploitation } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CreateIdentifiantDto {
  @IsNotEmpty()
  readonly sexe: number;
  @IsNotEmpty()
  readonly annee_string: string;
  @IsNotEmpty()
  readonly annee_numeric: number;
  @IsNotEmpty()
  readonly annee_true: number;
  @IsNotEmpty()
  readonly ordre_string: string;
  @IsNotEmpty()
  readonly ordre_numeric: number;
  @IsNotEmpty()
  readonly code_string: string;
  @IsNotEmpty()
  readonly code_numeric: number;
}

export class UpdateIdentifiantDto {
  @IsNotEmpty()
  readonly sexe: number;
  @IsNotEmpty()
  readonly annee_string: string;
  @IsNotEmpty()
  readonly annee_numeric: number;
  @IsNotEmpty()
  readonly annee_true: number;
  @IsNotEmpty()
  readonly ordre_string: string;
  @IsNotEmpty()
  readonly ordre_numeric: number;
  @IsNotEmpty()
  readonly code_string: string;
  @IsNotEmpty()
  readonly code_numeric: number;
}

export class GetIdentifiantParamsDTO {
  id?: number;
  sexe?: number;
  annee_true?: number;
  code_numeric?: number;
}

export interface IIdentifiant {
  id: number;
  sexe: number;
  annee_string: string;
  annee_numeric: number;
  annee_true: number;
  ordre_string: string;
  ordre_numeric: number;
  code_string: string;
  code_numeric: number;
}
