import { Role } from "../enums/role.enum";
import { UpdateUserDto } from "../users/dto/update-user.dto";

export const updateUserDTO: UpdateUserDto = {
    nome: "teste",
    email: "teste@gmail.com",
    senha: "12345678",
    cpf: '12345678901',
    Telefone: '1236789011',
    role: Role.cliente
}