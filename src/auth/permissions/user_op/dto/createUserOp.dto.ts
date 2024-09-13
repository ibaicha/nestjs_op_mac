import { IsNotEmpty } from "class-validator";

export class CreateUserOpDto {
    @IsNotEmpty()
    readonly userId: number;
    @IsNotEmpty()
    readonly opId: number;
}
