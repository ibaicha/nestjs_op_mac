import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateProduitDto {
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