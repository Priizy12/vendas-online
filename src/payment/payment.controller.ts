import { BadRequestException, Body, Controller, Post, UseGuards } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { User } from "../decorators/user.decorator";
import { AuthGuard } from "../guards/auth.guard";
import { PrismaService } from "../database/prisma.service";
import Stripe from "stripe";





@Controller('payments')
export class PaymentController {

    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

    constructor(private readonly paymentService: PaymentService, private readonly prisma: PrismaService) { }

    @UseGuards(AuthGuard)
    @Post('create-checkout-session')
    async createCheckoutSession(@User() userId: number) {
        const session = await this.paymentService.createCheckoutSession(userId);
        return {
            url: session.url,
            sessionId: session.id
        };
    }

    @Post('webhook')
    async handleWebhook(@Body() body: any, req: Request) {
        let event: Stripe.Event;

        try {
            event = this.stripe.webhooks.constructEvent(
                body,
                req.headers['stripe-signature'],
                String(process.env.STRIPE_WEBHOOK_SECRET)
            );
        } catch (err) {
            throw new BadRequestException("nao foi possivel concluir evento", err)
        }

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session;

            const sessionWithLineItems = await this.stripe.checkout.sessions.retrieve(session.id, {
                expand: ['line_items'],
            });

            const products = sessionWithLineItems.line_items.data.map(item => {
                return {
                    name: item.description,
                    price: item.amount_total,
                    quantity: item.quantity,
                };
            });


            const address = await this.prisma.adress.findFirst({
                where: { userId: Number(session.customer) },
            });

            const cart = await this.prisma.cart.findFirst({
                where: { userId: Number(session.customer) },
            });

            const data = {
                adressId: address.id,
                cartId: cart.id,
                userId: Number(session.customer)
            };

            await this.prisma.order.create({ data });
        }

        return { sucess: true }
    }
}

