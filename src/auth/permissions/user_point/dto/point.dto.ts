import { IsNotEmpty } from "class-validator";

export class CreateUserPointDto {
    @IsNotEmpty()
    readonly userId: number;
    @IsNotEmpty()
    readonly pointId: number;
}

export class UpdateUserPointDto {
    @IsNotEmpty()
    readonly userId: number;
    @IsNotEmpty()
    readonly pointId: number;
}

