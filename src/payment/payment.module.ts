import { Module } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";
import { PrismaClient } from "@prisma/client";
import { CartProductModule } from "../cartProduct/cart_product.module";
import { ProductModule } from "../Products/Products.module";


@Module({
    imports: [CartProductModule, ProductModule],
    providers: [PaymentService, PrismaClient],
    controllers: [PaymentController]
})

export class PaymentModule {}