import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateVillageDto {
    @IsNotEmpty()
    readonly name: string;
    @IsNotEmpty()
    readonly localiteId: number;
    readonly communeId: number;
}