import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InserCartDto } from "./dto/insert-cart.dto";
import { PrismaClient, Produtos, card_produtos } from '@prisma/client';
import { UpdateCartDto } from "./dto/update-cart.dto";



@Injectable()
export class CartProductService {

  constructor(private readonly prisma: PrismaClient) { }

  async addProductInCart(data: InserCartDto) {
    const { produtoId, amount } = data;


    const produto = await this.prisma.produtos.findUnique({
      where: { id_produto: produtoId },
    });

    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }
    
    if (amount > produto.estoque) {
      throw new BadRequestException('Quantidade desejada excede a quantidade em estoque');
    }

    const newCartItem = await this.prisma.card_produtos.create({
      data
    });

    return newCartItem;
  }


  async GetProductInCartById(usuarioId: number) {

    const cartItems = await this.prisma.card_produtos.findMany({
      where: { usuarioId: usuarioId },
      include: {
        produtos: {
          select: {
            nome_produto: true,
            preco: true,
            descricao: true,
            estoque: true
          }
        }
      },
    });
    let totalAmount = 0;

    for(const item of cartItems) {
      totalAmount += item.produtos.preco
    }

    return {
      items: cartItems,
      totalAmount
    }
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

      return { sucess: true }

    } catch (error) {
      console.log(error)
      throw new BadRequestException("Produto nao foi removido do carrinho, por favor espere, ou atualize a pagina e tente novamente")
    }
  }





}