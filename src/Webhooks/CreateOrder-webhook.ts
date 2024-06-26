import {
  BadRequestException,
  Controller,
  NotFoundException,
  Post,
  Req,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import Stripe from 'stripe';

@Controller('')
export class WebhookController {
  private stripe: Stripe;

  constructor(private readonly prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
  }

  @Post('payments/webhook')
  async handleWebhook(@Req() req: Request) {
    let event: Stripe.Event;

    try {
      const sig = req.headers['stripe-signature'];
      const rawBody = req.body.toString();

      event = this.stripe.webhooks.constructEvent(
        rawBody,
        sig,
        String(process.env.STRIPE_WEBHOOK_SECRET),
      );
    } catch (err) {
      throw new BadRequestException(
        'nao foi possivel pegar as informacoes para continuar com o evento',
      );
    }

    try {
      if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        const data = {
          userId: Number(session.metadata.userId),
          cart_Id: Number(session.metadata.cartId),
          adressId: Number(session.metadata.adressId),
        };

        if (!data.userId || !data.cart_Id || !data.adressId) {
           throw new NotFoundException('Dados nao econtrados');
        }
         
        await this.prisma.order.create({
          data,
        });
      }
      return { sucess: true };
    } catch (e) {
      console.log(e);
    }
  }

  
}
