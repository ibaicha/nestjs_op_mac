import { IsNotEmpty } from "class-validator";

export class CreateTypeUniteGrandeurDto {
    @IsNotEmpty()
    readonly name: string;
}