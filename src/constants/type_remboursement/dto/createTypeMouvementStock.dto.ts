import { IsNotEmpty } from "class-validator";

export class CreateTypeMouvementStockDto {
    @IsNotEmpty()
    readonly name: string;
}