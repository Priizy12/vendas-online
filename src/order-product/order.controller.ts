import { Controller, Post, Body, Get } from '@nestjs/common';
import { Stripe } from 'stripe';
import { OrderService } from './order.service';

@Controller('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}


  @Get()
  async getOrder() {
      return this.orderService.getProducts();
  }

 
}
