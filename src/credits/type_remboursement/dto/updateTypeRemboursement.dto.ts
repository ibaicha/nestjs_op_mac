import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateTypeRemboursementDto {
    @IsNotEmpty()
    readonly name: string;
}