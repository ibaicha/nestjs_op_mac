import { IsNotEmpty } from 'class-validator';

export class CreateAgenceDto {
  @IsNotEmpty()
  readonly name: string;
  readonly sigle: string;
  @IsNotEmpty()
  societeId: number;
}

export class UpdateAgenceDto {
  @IsNotEmpty()
  readonly name: string;
  readonly sigle: string;
  @IsNotEmpty()
  societeId: number;
}
