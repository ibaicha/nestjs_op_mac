import { IsNotEmpty } from 'class-validator';

export class CreateSocieteDto {
  @IsNotEmpty()
  readonly name: string;
  readonly sigle: string;
  readonly email: string;
  readonly telephone: string;
  readonly adresse: string;
  @IsNotEmpty()
  typeSocieteId: number;

}

export class UpdateSocieteDto {
  @IsNotEmpty()
  readonly name: string;
  readonly sigle: string;
  readonly email: string;
  readonly telephone: string;
  readonly adresse: string;
  @IsNotEmpty()
  typeSocieteId: number;
}

