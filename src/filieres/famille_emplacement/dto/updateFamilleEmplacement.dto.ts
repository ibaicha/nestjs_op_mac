import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateFamilleEmplacementDto {
    @IsNotEmpty()
    readonly name: string;
}