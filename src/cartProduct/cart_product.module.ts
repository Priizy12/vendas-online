import { Module } from "@nestjs/common";
import { CartProductService } from "./cart_product.service";
import { PrismaClient } from "@prisma/client";
import { CartProductController } from "./cart_product.controller";




@Module({
    controllers: [CartProductController],
    providers: [CartProductService, PrismaClient],
    exports: [CartProductModule]
})
export class CartProductModule {}