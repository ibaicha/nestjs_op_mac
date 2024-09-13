import { IsNotEmpty } from "class-validator";

export class CreateSousZoneDto {
    @IsNotEmpty()
    readonly name: string;
    @IsNotEmpty()
    readonly zoneId: number;
}