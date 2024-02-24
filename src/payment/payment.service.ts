import { Injectable } from '@nestjs/common';
import { Produtos, card_produtos } from '@prisma/client';
import Stripe from 'stripe';
@Injectable()
export class PaymentService {

  private stripe;

  constructor(
    private readonly cart: card_produtos,
    private readonly product: Produtos,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16'
      
    })
  }
  async checkout(){
   
  }



}
