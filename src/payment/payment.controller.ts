// import { Body, Controller, Get, Post } from "@nestjs/common";
// import { PaymentService } from "./payment.service";




// @Controller('payments')
// export class PaymentController {


//     constructor(private readonly paymentService: PaymentService) { }

//     @Post('create-checkout-session')
//     async createCheckoutSession(@Body() data) {
//         const session = await this.paymentService.createCheckoutSession(data);
//         return session.url;
//     }

// }