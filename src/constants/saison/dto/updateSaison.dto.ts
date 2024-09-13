import { IsNotEmpty } from "class-validator";

export class UpdateSaisonDto {
    @IsNotEmpty()
    readonly name: string;
    readonly description: string;
    
}