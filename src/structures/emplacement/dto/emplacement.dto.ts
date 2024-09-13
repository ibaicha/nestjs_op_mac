import { IsNotEmpty } from "class-validator";

export class CreateEmplacementDto {
    @IsNotEmpty()
    readonly name: string;
    readonly code: number;
    readonly capacite: number;
    @IsNotEmpty()
    readonly entrepotId: number;
    @IsNotEmpty()
    readonly familleEmplacementId: number;
}

export class UpdateEmplacementDto {
    @IsNotEmpty()
    readonly name: string;
    readonly code: number;
    readonly capacite: number;
    @IsNotEmpty()
    readonly entrepotId: number;
    @IsNotEmpty()
    readonly familleEmplacementId: number;
}