import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { User } from "../decorators/user.decorator";
import { AuthGuard } from "../guards/auth.guard";
import { Paramid } from "../decorators/param-id.decorator";




@Controller('payments')
export class PaymentController {


    constructor(private readonly paymentService: PaymentService) { }

    @UseGuards(AuthGuard)
    @Post('create-checkout-session')
    async createCheckoutSession(@User() userId: number) {
        const session = await this.paymentService.createCheckoutSession(userId);
        return {
            url: session.url,
            sessionId: session.id
        };
    }


    @UseGuards(AuthGuard)
    @Get('retrieve-checkout-session/:sessionId')
    async retrieveCheckoutSession(@Param('sessionId') sessionId: string) {
        const paymentStatus = await this.paymentService.retrieveCheckoutSession(sessionId);
        return paymentStatus;
    }

}