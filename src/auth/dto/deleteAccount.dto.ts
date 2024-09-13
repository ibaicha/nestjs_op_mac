import { IsNotEmpty } from "class-validator";

export class DeleteAccountdto{
    @IsNotEmpty()
    readonly password: string;
}