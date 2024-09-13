import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateRemboursementDto {
    @IsNotEmpty()
    readonly date: Date;
    readonly pu: number;
    @IsNotEmpty()
    readonly nombre_unite: number;
    @IsNotEmpty()
    readonly nombre_emballage: number;
    @IsNotEmpty()
    readonly valeur: number;
    @IsNotEmpty()
    readonly typeRemboursementId: number;
    @IsNotEmpty()
    readonly exploitationId: number;
    readonly emballageId: number;
}