import { Controller, Get, Post } from "@nestjs/common";
import { PaymentService } from "./payment.service";




@Controller('payments')
export class PaymentController {


    constructor(private readonly paymentService: PaymentService) { }


    

}