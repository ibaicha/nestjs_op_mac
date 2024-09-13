import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateMouvementStockDto {
    @IsNotEmpty()
    readonly date: Date;
    @IsNotEmpty()
    readonly pu: number;
    @IsNotEmpty()
    readonly quantiteEntreeEmballage: number;
    @IsNotEmpty()
    readonly quantiteSortieEmballage: number;
    @IsNotEmpty()
    readonly nombreUnite: number;
    @IsNotEmpty()
    readonly valeur: number;
    readonly opId: number;
    readonly uniteTransformationId: number;
    @IsNotEmpty()
    readonly varieteId: number;
    @IsNotEmpty()
    readonly modeEntreeSortieStockId: number;
    @IsNotEmpty()
    readonly emplacementId: number;
    @IsNotEmpty()
    readonly emballageId: number;
    @IsNotEmpty()
    readonly anneeId: number;
    @IsNotEmpty()
    readonly saisonId: number;
}