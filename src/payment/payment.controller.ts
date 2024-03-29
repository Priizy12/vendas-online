import { BadRequestException, Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
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
    async handleWebhook(@Req() req: Request) {
        let event: Stripe.Event;

        try {
            const sig = req.headers['stripe-signature'];
            const rawBody = (req as any).rawBody;

            event = this.stripe.webhooks.constructEvent(
                rawBody,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (err) {
            console.log(err);
            throw new BadRequestException("nao foi possivel concluir evento");
        }


        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session;

            const sessionWithLineItems = await this.stripe.checkout.sessions.retrieve(session.id, {
                expand: ['line_items'],
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

