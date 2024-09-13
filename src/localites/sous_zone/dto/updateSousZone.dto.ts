import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateSousZoneDto {
    @IsNotEmpty()
    readonly name: string;
    @IsNotEmpty()
    readonly zoneId: number;
}