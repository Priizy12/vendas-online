import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaClient } from '@prisma/client';
import { MailerService } from "@nestjs-modules/mailer";
import { UsersService } from "../users/users.service";
import { SendtrackingDto } from "./dtos/send-tracking-dto";
import { ProductService } from "../Products/Products.service";


@Injectable()
export class OrderService {

    constructor(
        private readonly prisma: PrismaClient,
        private readonly mailer: MailerService,
        private readonly users: UsersService,
        private readonly product: ProductService

    ) { }


    async getOrderProducts() {
        try {
            const products = await this.prisma.order.findMany({
                include: {
                    users: {
                        select: {
                            nome: true,
                            email: true,
                            CPF: true
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
                            email: true,
                            CPF: true
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

    async getOrderUser(userId: number) {
        try {
            const user = await this.prisma.order.findFirst({
                where: {
                    userId: Number(userId)
                }
            });

            if (!user) throw new NotFoundException("Nao existe pedidos para esse usuario");


            const OrderByUser = await this.prisma.order.findMany({
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

    async DeliveredProduct(id_order: number) {
        try {
            const Order = await this.prisma.order.findFirst({
                where: {
                    id_order: Number(id_order)
                }
            });

            if (!Order) throw new NotFoundException("Esse pedido nao existe ou nao foi encontrado na base de dados.");

            const DeliveredProduct = await this.prisma.order.update({
                where: {
                    id_order: Number(id_order)
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

    async SendTrackingCode(data: SendtrackingDto, userId: number) {
        const order = await this.getOrderProductsByUser(userId);
        const user = await this.users.readById(order.userId);

        try {
            await this.prisma.order.update({
                where: {
                    id_order: order.id_order
                },
                data
            })

            const Template = {
                name: user.nome,
                email: user.email,
                trackingCode: data.trackingCode
            };

            await this.mailer.sendMail({
                to: `${user.email}`,
                subject: 'Código de Rastreio do Pedido',
                template: 'trackingCode',
                context: Template
            });

            return true;
        } catch (error) {
            console.log(error);
            throw new BadRequestException("Nao foi possivel enviar o codigo para o usuario, tente novamente.")
        }

    }

    async DeleteOrder(id_order: number) {
        try {
            const Order = await this.prisma.order.findFirst({
                where: {
                    id_order: Number(id_order)
                }
            });

            if (!Order) throw new NotFoundException("Esse pedido nao existe ou nao foi encontrado na base de dados.");

            const deleteOrder = await this.prisma.order.delete({
                where: {
                    id_order: Number(id_order)
                }
            });

            return { sucess: true }
        } catch (error) {
            console.log(error);
            throw new BadRequestException("não foi possivel deletar esse pedido.")
        }
    }
}