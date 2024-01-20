import { Role } from "../enums/role.enum";
import { CreateUserDTO } from "../users/dto/create-user.dto";

export const data: CreateUserDTO = {
    nome: "teste",
    email: "teste@gmail.com",
    senha: "12345678",
    cpf: '12345678901',
    Telefone: '1236789011',
    role: Role.cliente
}