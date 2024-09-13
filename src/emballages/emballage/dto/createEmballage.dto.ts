import { IsNotEmpty } from "class-validator";

export class CreateEmballageDto {
    @IsNotEmpty()
    readonly name: string;
    @IsNotEmpty()
    readonly conditionnement: string;
    @IsNotEmpty()
    readonly quantite: number;
    @IsNotEmpty()
    readonly pu: number;
    @IsNotEmpty()
    readonly valeur: number;
    @IsNotEmpty()
    isActive: boolean;
    @IsNotEmpty()
    isDefault: boolean;
    @IsNotEmpty()
    produitId: number;
    @IsNotEmpty()
    typeEmballageId: number;
    @IsNotEmpty()
    uniteGrandeurId: number;
}
