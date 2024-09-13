import { IsNotEmpty } from "class-validator";

export class CreateSaisonDto {
    @IsNotEmpty()
    readonly name: string;
    readonly description: string;
    
}