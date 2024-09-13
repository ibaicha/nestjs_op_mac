import { IsNotEmpty } from "class-validator";

export class CreateUniteTransformationDto {
    @IsNotEmpty()
    readonly name: string;
    readonly sigle: string;
    readonly adresse: string;
    readonly telephone: string;


    
}