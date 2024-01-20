import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Role } from "src/enums/role.enum";

export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    nome_produto: string;

    @IsNumber()
    @IsNotEmpty()
    preco: number;      

    @IsNotEmpty()
    @IsString()
    descricao: string;

    @IsOptional()
    @IsNumber()
    estoque: number;

    // @IsNotEmpty()
    // image: string;

}