import { IsNotEmpty } from "class-validator";

export class CreateFiliereDto {
    @IsNotEmpty()
    readonly name: string;
}