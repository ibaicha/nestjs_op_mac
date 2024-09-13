import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateProfileDto {
    @IsNotEmpty()
    readonly firstName: string;
    @IsNotEmpty()
    readonly lastName: string;
    readonly address: string;
    readonly phone: string;
    @IsNotEmpty()
    readonly userId: number;
}