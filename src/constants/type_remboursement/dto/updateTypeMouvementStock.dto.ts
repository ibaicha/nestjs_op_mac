import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateTypeMouvementStockDto {
    @IsNotEmpty()
    readonly name: string;
}