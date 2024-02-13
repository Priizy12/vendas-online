import { ApiProperty } from "@nestjs/swagger";
import {  IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    nome_produto: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    preco: number;      

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    descricao: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    estoque: number;

}