import { Controller, Post, Body } from '@nestjs/common';
import { Stripe } from 'stripe';
import { OrderService } from './order.service';

@Controller('')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

 
}
