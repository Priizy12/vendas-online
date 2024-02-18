import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateImageDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    url: string;

    @ApiProperty()
    @IsNumber()
    produtoId: number

}