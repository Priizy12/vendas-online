import { BadRequestException, Injectable } from "@nestjs/common";
import { InserCartDto } from "./dto/insert-cart.dto";
import { PrismaClient } from "@prisma/client";




@Injectable()
export class CartProductService {

    constructor( private readonly prisma: PrismaClient) {}

    async addToCart (data: InserCartDto){

      try {
        const insert = await this.prisma.card_produtos.create({
            data
        })

        return {message: "Produto adicionado ao carrinho", insert}
      } catch (error) {
        throw new BadRequestException('Opa, ocorreu algum erro e não foi possivel adiconar esse produto ao carrinho')
      }
    }

}