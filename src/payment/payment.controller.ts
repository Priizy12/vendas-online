import { Controller, Get, Post } from "@nestjs/common";
import { PaymentService } from "./payment.service";




@Controller('payments')
export class PaymentController {


    constructor(private readonly paymentService: PaymentService) { }


    @Post('create')
    async createPayment() {
        return this.paymentService.createPayment();
    }


    @Get()
    async paymentpending() {

    }
    @Get()
    async paymentfailure() {

    }

}