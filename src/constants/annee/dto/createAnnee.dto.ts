import { IsNotEmpty } from "class-validator";

export class CreateAnneeDto {
    @IsNotEmpty()
    readonly name: string;
    @IsNotEmpty()
    readonly valeur: number;
    
}