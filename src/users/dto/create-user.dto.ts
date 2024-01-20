import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, } from "class-validator";
import { Role } from "../../enums/role.enum";



export class CreateUserDTO {

    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    senha: string

    @IsNotEmpty()
    @IsString()
    cpf: string;

    @IsNotEmpty()
    @IsString()
    Telefone: string;

   
    @IsEnum(Role)
    @IsOptional()
    role: number;
}