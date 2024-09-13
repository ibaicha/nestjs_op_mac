import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateModeEntreeSortieStockDto {
    @IsNotEmpty()
    readonly code: string;
    @IsNotEmpty()
    readonly name: string;
    @IsNotEmpty()
    readonly typeMouvementStockId: number;
}