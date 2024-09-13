import { IsNotEmpty } from "class-validator";

export class CreateFamilleEmplacementDto {
    @IsNotEmpty()
    readonly name: string;
}