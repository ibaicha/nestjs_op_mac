import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateZoneDto {
    @IsNotEmpty()
    readonly name: string;
    @IsNotEmpty()
    readonly paysId: number;
}