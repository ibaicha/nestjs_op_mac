import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateTypeUniteGrandeurDto {
    @IsNotEmpty()
    readonly name: string;
}