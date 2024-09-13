import { IsNotEmpty } from "class-validator";

export class CreateProducteurDto {
    readonly compte: number;
    @IsNotEmpty()
    readonly prenom: string;
    @IsNotEmpty()
    readonly nom: string;
    readonly cni: string;
    readonly email: string;
    readonly telephone: string;
    readonly adresse: string;
    readonly isActive: boolean;
    @IsNotEmpty()
    readonly opId: number;
}