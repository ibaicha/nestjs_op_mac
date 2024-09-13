import { IsNotEmpty } from "class-validator";

export class CreateTypeRemboursementDto {
    @IsNotEmpty()
    readonly name: string;
}