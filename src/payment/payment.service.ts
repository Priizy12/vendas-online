// import { Injectable } from '@nestjs/common';
// import { PrismaClient, card_produtos, users } from '@prisma/client';
// import Stripe from 'stripe';
// import { CartProductService } from '../cartProduct/cart_product.service';


// @Injectable()
// export class PaymentService {

//     constructor(
//         private readonly prisma: PrismaClient,
//         private readonly cart: CartProductService
       
//     ) { }

//     async payment(paymentMethodId: string,  userId: number, totalAmount: number) {
//         const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

//         const user = await this.prisma.users.findUnique({ where: { id: userId } });
       
//         const customer = await stripe.customers.create({
//             email: user.email
//         })

//         const updatedUser = await this.prisma.users.update({
//             where: { id: user.id },
//             data: { stripeCustomerId: customer.id },
//         });

//         const pyamentIntent = await stripe.paymentIntents.create({
//             amount: totalAmount,
//             currency: 'brl',
//             customer: customer.id,
//             payment_method: paymentMethodId,
//             off_session: true,
//             confirm: true,
//         })

//         const cart = await this.cart.GetProductInCartById(userId);
//         const totalAmountInReais = cart.totalAmount;
    

//         const totalAmountInCents = Math.round(totalAmountInReais * 100);
    
//         await this.payment(paymentMethodId, userId, totalAmountInCents);
//     }

// }
