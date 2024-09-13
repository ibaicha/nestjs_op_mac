import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateUserOpDto {
    @IsNotEmpty()
    readonly userId: number;
    @IsNotEmpty()
    readonly opId: number;
}