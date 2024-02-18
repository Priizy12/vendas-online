import { Controller, Get } from "@nestjs/common";




@Controller('payments')
export class PaymentController {


    @Get()
    async paymentCheckout () {

    }

    @Get()
    async paymentSucess () {

    }
    @Get()
    async paymentpending () {

    }
    @Get()
    async paymentfailure () {

    }

}