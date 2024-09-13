import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdatePostDto {
    @IsNotEmpty()
    readonly title: string;
    @IsOptional()
    readonly body: string;
}