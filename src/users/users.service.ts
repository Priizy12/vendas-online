import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client';


@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaClient
  ) { }

  async read() {
    return this.prisma.users.findMany()
  }


  async readById(id: number) {

    const usuarioExist = await this.prisma.users.findFirst({
      where: {
        id: Number(id)
      }
    });

    if (!usuarioExist) {
      throw new NotFoundException('Esse Usuario nao existe')
    }

    return await this.prisma.users.findFirst({
      where: {
        id: Number(id)
      }
    });
  }

  async create(data: CreateUserDTO) {

    const usuarioExist = await this.prisma.users.findFirst({
      where: {
        email: data.email
      }
    });
    if (usuarioExist) throw new NotFoundException('Esse Usuario ja existe')

    const salt = await bcrypt.genSalt();

    data.senha = await bcrypt.hash(data.senha, salt);

    const user = await this.prisma.users.create({ data })

    return user;

  }



  async update(id: number, { email, nome, senha, Telefone, role, genero }: UpdateUserDto) {

    try {
      const usuarioExist = await this.prisma.users.findFirst({
        where: {
          id: Number(id)
        }
      });

      if (!usuarioExist) throw new NotFoundException(`Esse Usuario do id:${id} não existe`);

      const salt = await bcrypt.genSalt();

      senha = await bcrypt.hash(senha, salt);

      return this.prisma.users.update({
        where: {
          id: Number(id)
        },
        data: {
          email,
          nome,
          senha,
          Telefone,
          role,
          genero
        }
      });

    } catch (error) {
      console.log(error)
      throw new BadRequestException('não foi possivel atualizar informações do usúario.')
    };
  };




  async delete(id: number) {
    const usuarioExist = await this.prisma.users.findFirst({
      where: {
        id: Number(id)
      }
    });
    if (!usuarioExist) throw new NotFoundException(`Esse usuario do id: ${id} não existe`)

    await this.prisma.users.delete({
      where: {
        id: Number(id)
      }
    });

    return true;
  }

}
