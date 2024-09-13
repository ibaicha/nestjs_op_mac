import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateModeEntreeSortieIntrantDto {
    @IsNotEmpty()
    readonly code: string;
    @IsNotEmpty()
    readonly name: string;
    @IsNotEmpty()
    readonly typeMouvementIntrantId: number;
}