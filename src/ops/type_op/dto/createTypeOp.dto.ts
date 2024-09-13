import { IsNotEmpty } from "class-validator";

export class CreateTypeOpDto {
    @IsNotEmpty()
    readonly name: string;
}