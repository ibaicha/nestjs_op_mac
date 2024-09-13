import { IsNotEmpty } from "class-validator";

export class CreateUserSocieteDto {
    @IsNotEmpty()
    readonly userId: number;
    @IsNotEmpty()
    readonly societeId: number;
}


export class UpdateUserSocieteDto {
    @IsNotEmpty()
    readonly userId: number;
    @IsNotEmpty()
    readonly societeId: number;
}
