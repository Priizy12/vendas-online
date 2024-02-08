import { BadRequestException, Injectable } from "@nestjs/common";
import { InserCartDto } from "./dto/insert-cart.dto";
import { PrismaClient, Produtos } from "@prisma/client";
import { CreateProductDto } from "../Products/dto/create-product.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";



@Injectable()
export class CartProductService {

  constructor(private readonly prisma: PrismaClient) { }

  async addProductInCart(data: InserCartDto, id_produto: number) {

    try {
      const product = await this.prisma.produtos.findFirst({
        where: {
          id_produto: id_produto
        }
      })

      if (!product) {
        throw new BadRequestException("Esse produto não está mais disponivel.")
      }

      const insert = await this.prisma.card_produtos.create({
        data
      })

      return { message: "Produto adicionado ao carrinho", insert }
    } catch (error) {
      console.log(error)
      throw new BadRequestException('Opa, ocorreu algum erro e não foi possivel adiconar esse produto ao carrinho')
    }
  }


  async GetProductInCart() {
    const product = this.prisma.card_produtos.findMany({
      include: {
        produtos: {
          select: {
            nome_produto: true,
            preco: true,
            descricao: true,
            estoque: true
          }
        }
      }
    });

    return product
  }



  async UpdateProduct(data: UpdateCartDto, produtoId: number) {
    try {
      const productExist = await this.prisma.card_produtos.findFirst({
        where: {
          id: Number(produtoId)
        }
      })

      if (!productExist) throw new BadRequestException("Produto não encontrado no carrinho!!!")

      const updateProduct = await this.prisma.card_produtos.update({
        where: {
          id: Number(produtoId)
        },
        data
      })

      return true;
    } catch (error) {
      throw new BadRequestException("Nao foi possivel fazer nenhuma alteração no produto, por favor atualize a pagina ou espere.")
      console.log(error)
    }

  }

  async deleteProductInCart(produtoId: number) {
    try {

      const productExist = await this.prisma.card_produtos.findFirst({
        where: {
          id: Number(produtoId)
        }
      })

      if (!productExist) throw new BadRequestException("Produto não encontrado no carrinho!!!")

      const removeProduct = await this.prisma.card_produtos.delete({
        where: {
          id: Number(produtoId)
        }
      })

      return {sucess: true}
      
    } catch (error) {
      console.log(error)
      throw new BadRequestException("Produto nao foi removido do carrinho, por favor espere, ou atualize a pagina e tente novamente")
    }
  }





}