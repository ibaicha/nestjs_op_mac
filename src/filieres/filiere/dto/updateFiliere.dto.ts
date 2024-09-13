import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateFiliereDto {
    @IsNotEmpty()
    readonly name: string;
}