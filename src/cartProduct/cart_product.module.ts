import { Module } from "@nestjs/common";
import { CartProductService } from "./cart_product.service";
import { PrismaClient } from "@prisma/client";
import { CartProductController } from "./cart_product.controller";
import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";
import { ProductModule } from "../Products/Products.module";




@Module({
    imports:[ AuthModule, UsersModule, ProductModule],
    controllers: [CartProductController,],
    providers: [CartProductService, PrismaClient],
    exports: [CartProductService]
})
export class CartProductModule {}