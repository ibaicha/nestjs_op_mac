import { IsNotEmpty } from "class-validator";

export class CreateProfileDto {
    @IsNotEmpty()
    readonly firstName: string;
    @IsNotEmpty()
    readonly lastName: string;
    readonly address: string;
    readonly phone: string;
    @IsNotEmpty()
    readonly userId: number;
}
