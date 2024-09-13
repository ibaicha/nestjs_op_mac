import { IsNotEmpty } from "class-validator";

export class CreateCampagneDto {
    @IsNotEmpty()
    readonly anneeId: number;
    @IsNotEmpty()
    readonly saisonId: number;

}