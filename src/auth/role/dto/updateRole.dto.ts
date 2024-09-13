import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateRoleDto {
    @IsNotEmpty()
    readonly name: string;
}