import { IsNotEmpty } from "class-validator";

export class CreateUserAgenceDto {
    @IsNotEmpty()
    readonly userId: number;
    @IsNotEmpty()
    readonly agenceId: number;
}

export class UpdateUserAgenceDto {
    @IsNotEmpty()
    readonly userId: number;
    @IsNotEmpty()
    readonly agenceId: number;
}
