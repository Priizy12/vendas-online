import { Injectable } from '@nestjs/common';
import { Produtos, adress, card_produtos, users } from '@prisma/client';
import { MercadoPagoConfig, Preference } from 'mercadopago';
const client = new MercadoPagoConfig({ accessToken: 'YOUR_ACCESS_TOKEN' });

@Injectable()
export class OrderService {

    constructor(
        private readonly users: users,
        private readonly product: Produtos,
        private readonly cart: card_produtos,
        private readonly adress: adress
    ) { }

    async payament() {

        const preference = new Preference(client);
        preference.create({
            body: {
                items: [
                    {
                        id: String(this.users.id),
                        title: String(this.product.nome_produto),
                        currency_id: 'BRL',
                        picture_url: 'https://www.mercadopago.com/org-img/MP3/home/logomp3.gif',
                        description: String(this.product.descricao),
                        category_id: 'art',
                        quantity: this.cart.amount,
                        unit_price: this.product.preco
                    }
                ],
                payer: {
                    name: this.users.nome,
                    email: this.users.email,
                    phone: {
                        number: this.users.Telefone
                    },
                    identification: {
                        type: 'CPF',
                        number: this.users.CPF
                    },
                    address: {
                        street_name: this.adress.Rua,
                        street_number: this.adress.numero,
                        zip_code: this.adress.CEP
                    }
                },
                back_urls: {
                    success: 'https://www.success.com',
                    failure: 'http://www.failure.com',
                    pending: 'http://www.pending.com'
                },
                auto_return: 'approved',
                payment_methods: {
                    excluded_payment_methods: [],
                    excluded_payment_types: [],
                    installments: 1
                },
                notification_url: 'https://www.your-site.com/ipn',
                statement_descriptor: 'WesleyCosmeticos',
                external_reference: 'Cosmeticos',
                expires: true,
                expiration_date_from: '2016-02-01T12:00:00.000-04:00',
                expiration_date_to: '2016-02-28T12:00:00.000-04:00'
            }
        }).then(console.log).catch(console.log);;

    }
}
