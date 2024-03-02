import { Injectable } from '@nestjs/common';
import { Produtos  } from '@prisma/client';
import Stripe from 'stripe';
import { CartProductService } from '../cartProduct/cart_product.service';



@Injectable()
export class PaymentService {

    private stripe: Stripe;

    constructor(private readonly cart: CartProductService) {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2023-10-16',
        });
    }

    async createCheckoutSession(usuarioId: number) {
        const cart = await this.cart.GetProductInCartById(usuarioId);
        const produtos = cart.items;
    
        const line_items = produtos.map(item => {
            return {
                price_data: {
                    currency: 'brl',
                    product_data: {
                        name: item.produtos.nome_produto,
                        description: item.produtos.descricao
                    },
                    unit_amount: item.produtos.preco * 100,
                },
                quantity: item.amount
            }
        });
    
        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: 'https://example.com/success',
            cancel_url: 'https://example.com/cancel',
        });
    
        console.log(session.url);
    
        return session;
    }
}

