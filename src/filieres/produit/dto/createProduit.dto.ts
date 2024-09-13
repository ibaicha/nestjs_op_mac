import { IsNotEmpty } from "class-validator";

export class CreateProduitDto {
    @IsNotEmpty()
    readonly name: string;
    @IsNotEmpty()
    readonly isRecolte: boolean;
    @IsNotEmpty()
    readonly isDerive: boolean;
    @IsNotEmpty()
    readonly isEnsachage: boolean;
    @IsNotEmpty()
    readonly isActive: boolean;
    @IsNotEmpty()
    readonly filiereId: number;
    @IsNotEmpty()
    readonly familleEmplacementId: number;

}