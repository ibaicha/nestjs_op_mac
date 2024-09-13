import { IsNotEmpty } from "class-validator";

export class CreatePointAgenceDto {

    @IsNotEmpty()
    readonly pointId: number;
    @IsNotEmpty()
    readonly agenceId: number;

}

export class UpdatePointAgenceDto {

    @IsNotEmpty()
    readonly pointId: number;
    @IsNotEmpty()
    readonly agenceId: number;

}