import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaClient } from '@prisma/client';
import { MailerService } from "@nestjs-modules/mailer";




@Injectable()
export class OrderService {

    constructor(
        private readonly prisma: PrismaClient,
        private readonly mailer: MailerService
    ) { }


    async getOrderProducts() {
        try {
            const products = await this.prisma.order.findMany({
                include: {
                    users: {
                        select: {
                            nome: true,
                            email: true
                        }
                    },
                    adress: {
                        select: {
                            estado: true,
                            cidade: true,
                            bairro: true,
                            Rua: true,
                            numero: true,
                            CEP: true,
                            telefone_contato: true,
                            complemento: true,
                            ponto_de_referencia: true
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
                        },

                    }
                }
            });
            return products;
        } catch (error) {
            console.log(error);
            throw new BadRequestException("Não foi possivel visualizar todos os pedidos existentes")
        }
    }

    async getOrderProductsByUser(userId: number) {

        try {
            const user = await this.prisma.order.findFirst({
                where: {
                    userId: Number(userId)
                }
            });

            if (!user) {
               throw new NotFoundException("Nao existe pedidos para esse usuario");
            }

            const OrderByUser = await this.prisma.order.findFirst({
                where: {
                    userId: Number(userId)
                },
                include: {
                    users: {
                        select: {
                            nome: true,
                            email: true
                        }
                    },
                    adress: {
                        select: {
                            estado: true,
                            cidade: true,
                            bairro: true,
                            Rua: true,
                            numero: true,
                            CEP: true,
                            telefone_contato: true,
                            complemento: true,
                            ponto_de_referencia: true
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
                        },

                    }
                }

            });
            return OrderByUser;
        } catch (error) {
            console.log(error);
            throw new BadRequestException("Não foi possivel visualizar pedidos desse Usuario")
        }
    }

    async DeliveredProduct(Delivered: boolean, id: number) {
        try {
            const Order = await this.prisma.order.findFirst({
                where: {
                    id: Number(id)
                }
            });

            if (!Order) throw new NotFoundException("Esse pedido nao existe ou nao foi encontrado na base de dados.");

            const DeliveredProduct = await this.prisma.order.update({
                where: {
                    id: Number(id)
                },
                data: {
                    Delivered: true
                }
            });

            return DeliveredProduct;
        } catch (error) {
            console.log(error)
            throw new BadRequestException("Nao foi possivel atualizar status de entrega do produto.")
        }
    }

    async SendTrackingCode(email: string) {

    }


}