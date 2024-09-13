import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateTypeEmballageDto {
    @IsNotEmpty()
    readonly name: string;
}