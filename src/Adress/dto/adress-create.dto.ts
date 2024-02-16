import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber,  IsString } from "class-validator";

export class AdressDTO {


    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    CEP: string;


    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    numero: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    complemento: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    ponto_de_referencia: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    bairro: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    estado: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    cidade: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    telefone_contato: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    endereco_id: number;
}