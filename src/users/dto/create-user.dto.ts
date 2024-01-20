import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, } from "class-validator";
import { Role } from "../../enums/role.enum";
import { ApiProperty } from "@nestjs/swagger";



export class CreateUserDTO {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true})
    nome: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ required: true})
    email: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true})
    senha: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true})
    cpf: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true})
    Telefone: string;

   
    @IsEnum(Role)
    @ApiProperty({ enum: ['Admin', 'Moderator', 'User'], default: 1})  
    @IsOptional()
    role: Role.cliente;
}