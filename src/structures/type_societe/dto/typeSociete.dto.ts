import { IsNotEmpty } from "class-validator";

export class CreateTypeSocieteDto {
    @IsNotEmpty()
    readonly name: string;
}

export class UpdateTypeSocieteDto {
    @IsNotEmpty()
    readonly name: string;
}