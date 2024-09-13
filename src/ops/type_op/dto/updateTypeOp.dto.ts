import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateTypeOpDto {
    @IsNotEmpty()
    readonly name: string;
}