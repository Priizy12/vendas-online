import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Role } from "src/enums/role.enum";

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

    // @IsNotEmpty()
    // image: string;

}