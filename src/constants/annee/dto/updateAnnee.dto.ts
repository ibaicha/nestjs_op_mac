import { IsNotEmpty } from "class-validator";

export class UpdateAnneeDto {
    @IsNotEmpty()
    readonly name: string;
    @IsNotEmpty()
    readonly valeur: number;
    
}