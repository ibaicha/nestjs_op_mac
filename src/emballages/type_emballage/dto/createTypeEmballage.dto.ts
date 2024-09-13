import { IsNotEmpty } from "class-validator";

export class CreateTypeEmballageDto {
    @IsNotEmpty()
    readonly name: string;
}