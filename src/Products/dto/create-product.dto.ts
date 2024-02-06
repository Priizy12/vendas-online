import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
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

    @IsDate()
    createdAt: Date

    @IsDate()
    updatedAt: Date

}