import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateUniteTransformationDto {
    @IsNotEmpty()
    readonly name: string;
    readonly sigle: string;
    readonly adresse: string;
    readonly telephone: string;




}