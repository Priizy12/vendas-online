import { Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller()
export class OrderController {

    constructor( private readonly orderService: OrderService){}

    @Post('payment')
    async pagamento() {
        return this.orderService.payament()
    }

}
