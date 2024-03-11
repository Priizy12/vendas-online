import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { User } from "../decorators/user.decorator";
import { AuthGuard } from "../guards/auth.guard";




@Controller('payments')
export class PaymentController {


    constructor(private readonly paymentService: PaymentService) { }

    @UseGuards(AuthGuard)
    @Post('create-checkout-session')
    async createCheckoutSession(@User() userId: number) {
        const session = await this.paymentService.createCheckoutSession(userId);
        return session.url;
    }

}