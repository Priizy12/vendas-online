import { BadRequestException, Controller, NotFoundException, Post,  RawBodyRequest,  Req, UseGuards } from "@nestjs/common";
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
            url: session.url
        };
    }

    

   
    @Post('webhook')
    async handleWebhook(@Req() req: Request) {
        let event: Stripe.Event;

        try {
            const sig = req.headers['stripe-signature'];
            const rawBody = req.body.toString()

            event = this.stripe.webhooks.constructEvent(
                rawBody,
                sig,
                String(process.env.STRIPE_WEBHOOK_SECRET)
            );
        } catch (err) {
            console.log(err);
            throw new BadRequestException("nao foi possivel pegar as informacoes para continuar com o evento");
        }


        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session;

          

            const data = {
                userId: Number(session.metadata.userId),
                cartId: Number(session.metadata.cartId)
            }

            if(!data.userId && !data.cartId) {
                throw new NotFoundException("Usuario ou produtos nao encontrados.")
            }


            await this.prisma.order.create({
                data
            })

         
        }

        return { sucess: true }
    }
}

