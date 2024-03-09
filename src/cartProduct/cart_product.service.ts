import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InserCartDto } from "./dto/insert-cart.dto";
import { PrismaClient, Produtos, card_produtos, cart } from '@prisma/client';
import { ProductService } from "../Products/Products.service";




@Injectable()
export class CartProductService {

  constructor(
    private readonly prisma: PrismaClient,
    private readonly productService: ProductService
  ) { }

  async verifyProductInCart(produtoId: number, cartId: number) {
    const cartProduct = await this.prisma.card_produtos.findFirst({
      where: {
        produtoId,
        cartId
      }
    });

    if (!cartProduct) {
      throw new NotFoundException("nao foi possivel encontrar o produto no carrinho");
    }

    return cartProduct;
  }

  async createProductInCart(data: InserCartDto, cartId: number) {
    return await this.prisma.card_produtos.create({
      data: {
        amount: data.amount,
        produtoId: data.produtoId,
        cartId
      }
    })
  }

  async insertProductInCart(data: InserCartDto, cart: cart) {
    await this.productService.getById(data.produtoId);

    const cartProduct = await this.verifyProductInCart(data.produtoId, cart.id).catch(() => undefined)

    if (!cartProduct) {
      return this.createProductInCart(data, cart.id)
    }

    const { id, ...cartProductWithoutId } = cartProduct;

    return await this.prisma.card_produtos.update({
      where: { id: cartProduct.id },
      data: {
        amount: cartProduct.amount + data.amount
      }
    });
  }

  async deleteProductInCart(produtoId: number, cartId: number) {
   try {
     await this.prisma.card_produtos.delete({
      where: {
        id: produtoId,
        cartId
      }
    });

    return true;

   } catch (error) {
    console.log(error);
    throw new BadRequestException("não foi possivel excluir o produto do carrinho, por favor tente novamente.")
   }
}

}