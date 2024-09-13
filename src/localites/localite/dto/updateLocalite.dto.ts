import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateLocaliteDto {
    @IsNotEmpty()
    readonly name: string;
    @IsNotEmpty()
    readonly sousZoneId: number;
}