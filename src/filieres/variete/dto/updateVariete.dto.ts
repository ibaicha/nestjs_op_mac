import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateVarieteDto {
    @IsNotEmpty()
    readonly name: string;
    @IsNotEmpty()
    readonly surface_unite: string;
    @IsNotEmpty()
    readonly quantite_unite: string;
    @IsNotEmpty()
    readonly pu_unite: number;
    @IsNotEmpty()
    readonly rendement_unite: number;
    @IsNotEmpty()
    readonly isActive: boolean;
    @IsNotEmpty()
    readonly produitId: number;
}