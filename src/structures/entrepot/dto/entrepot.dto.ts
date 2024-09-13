import { IsNotEmpty } from "class-validator";

export class CreateEntrepotDto {
    @IsNotEmpty()
    readonly name: string;
    readonly adresse: string;
    @IsNotEmpty()
    readonly pointId: number;
}