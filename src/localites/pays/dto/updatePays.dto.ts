import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdatePaysDto {
    @IsNotEmpty()
    readonly name: string;
    readonly sigle: string;
}