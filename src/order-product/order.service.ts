import { Injectable } from "@nestjs/common";
import { PrismaClient, card_produtos, cart } from '@prisma/client';
import { OrderDto } from "./dtos/order.dto";







@Injectable()
export class OrderService {

    constructor(private readonly prisma: PrismaClient) { }


    async getProducts() {
        const products = await this.prisma.order.findMany({
            include: {
                users: {
                    select: {
                        nome: true,
                        email: true
                    }
                },
                carrinho: {
                    select: {
                        amount: true,
                        produtos: {
                            select: {
                                nome_produto: true,
                                preco: true,
                            }
                        }
                    }
                }

            }
        });
        return products;
    }

}