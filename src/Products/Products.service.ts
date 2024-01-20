import { BadRequestException, Injectable, Delete } from '@nestjs/common';
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { PrismaClient } from "@prisma/client";





@Injectable()
export class ProductService {

    constructor(
       private readonly prisma: PrismaClient
    ) { }


    async get() {
        try {
            const Company = await this.prisma.produtos.findMany();
            return {
                message: "Lista de Contas Empresariais",
                Company
            };
        } catch (error) {
            console.log(error)
            throw new BadRequestException('Nao foi possivel visalizar a lista de empresas')
        }
    }


    async getById(id_produto: number) {
        try {
            const companyExist = await this.prisma.produtos.findUnique({
                    where:{
                        id_produto: Number(id_produto)
                    }
            });
            if (!companyExist) throw new BadRequestException('Essa empresa nao existe')

            const company = await this.prisma.produtos.findUnique({
              where:{
                id_produto: Number(id_produto)
              }
        });
            return company

        } catch (error) {
            throw new BadRequestException('nao foi possivel visualizar esta empresa. ')
        }
    }

    async create( data: CreateProductDto ) {
        try {
            const product = this.prisma.produtos.create ({
                data
            })

            return product;
           
        } catch (e) {
            console.log(e)
            throw new BadRequestException('Erro na criação da empresa, preencha os campos Corretamente.')
        }
    }


    async update(id_produto: number, { nome_produto, preco, descricao, estoque}: UpdateProductDto) {
        try {
            const productExist = await this.prisma.produtos.findUnique({
                where: {
                    id_produto: Number(id_produto)
                }
        });
            if (!productExist) throw new BadRequestException('Essa empresa nao existe')

            const product = await this.prisma.produtos.update({data: {
                nome_produto,
                preco,
                descricao,
                estoque,
            },
            where: {
                id_produto: Number(id_produto)
            }
        })

            return {
                message: "Produto Atualizado com sucesso"
            }
        } catch (error) {
            console.log(error)
            throw new BadRequestException('Erro na modificação de informações da empresa')
        }
    }


    async delete(id_produto: number) {
        const usuarioExist = await this.prisma.produtos.findFirst({
            where: {
              id_produto: Number(id_produto)
            }
          });
          if (!usuarioExist) throw new BadRequestException(`Esse produto do id: ${id_produto} não existe`)
      
          await this.prisma.produtos.delete({
            where: {
              id_produto: Number(id_produto)
            },
            include: {
              card: true
            }
          });
      
          return true;
    }
}
