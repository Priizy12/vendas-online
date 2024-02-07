import { BadRequestException, Injectable } from "@nestjs/common";
import { InserCartDto } from "./dto/insert-cart.dto";
import { PrismaClient, Produtos } from "@prisma/client";
import { CreateProductDto } from "../Products/dto/create-product.dto";



@Injectable()
export class CartProductService {

    constructor( private readonly prisma: PrismaClient) {}

    async addProductInCart (data: InserCartDto, id_produto: number){

      try {
        const product = await this.prisma.produtos.findFirst({
          where: {
            id_produto: id_produto
          }
        })

        if(!product) {
          throw new BadRequestException("Esse produto não está mais disponivel.")
        }
        
        const insert = await this.prisma.card_produtos.create({
            data
        })

        return {message: "Produto adicionado ao carrinho", insert}
      } catch (error) {
        console.log(error)
        throw new BadRequestException('Opa, ocorreu algum erro e não foi possivel adiconar esse produto ao carrinho')
      }
    }


  async GetProductInCart () {
      const product = this.prisma.card_produtos.findMany({
        include: {
          produtos: {
            select:{
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

    

}