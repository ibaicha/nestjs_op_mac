import { IsNotEmpty } from "class-validator";

export class CreateEmballageIntrantDto {
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
    chargeExploitationId: number;
    @IsNotEmpty()
    typeEmballageId: number;
}


export class UpdateEmballageIntrantDto {
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
    chargeExploitationId: number;
    @IsNotEmpty()
    typeEmballageId: number;
}