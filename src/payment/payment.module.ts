import { Module } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";
import { PrismaClient } from "@prisma/client";

import { CartProductModule } from "../cartProduct/cart_product.module";




@Module({
    imports: [CartProductModule],
    controllers: [PaymentController],
    providers: [PaymentService, PrismaClient],
    exports:[PaymentService]
})

export class PaymentModule {}