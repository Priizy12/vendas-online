import { Body, Controller, Get, Post } from "@nestjs/common";
import { PaymentService } from "./payment.service";




@Controller('payments')
export class PaymentController {


    constructor(private readonly paymentService: PaymentService) { }

    @Post('create-checkout-session')
    async createCheckoutSession(@Body() usuarioId: number) {
        const session = await this.paymentService.createCheckoutSession(usuarioId);
        return session.url;
    }

}