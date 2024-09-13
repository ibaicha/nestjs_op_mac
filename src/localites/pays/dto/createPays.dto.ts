import { IsNotEmpty } from "class-validator";

export class CreatePaysDto {
    @IsNotEmpty()
    readonly name: string;
    readonly sigle: string;
}