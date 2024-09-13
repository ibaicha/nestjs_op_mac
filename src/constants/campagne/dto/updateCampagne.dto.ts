import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateCampagneDto {
    @IsNotEmpty()
    readonly anneeId: number;
    @IsNotEmpty()
    readonly saisonId: number;
}