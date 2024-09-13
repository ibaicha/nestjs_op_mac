import { IsNotEmpty } from "class-validator";

export class CreatePointDto {
    @IsNotEmpty()
    readonly name: string;
    
    @IsNotEmpty()
    readonly isProduit: boolean;
    @IsNotEmpty()
    readonly isIntrant: boolean;
    @IsNotEmpty()
    readonly isVirtuel: boolean;

    @IsNotEmpty()
    readonly localiteId: number;


    
}

export class UpdatePointDto {
    @IsNotEmpty()
    readonly name: string;
    
    @IsNotEmpty()
    readonly isProduit: boolean;
    @IsNotEmpty()
    readonly isIntrant: boolean;
    @IsNotEmpty()
    readonly isVirtuel: boolean;

    @IsNotEmpty()
    readonly localiteId: number;


    
}