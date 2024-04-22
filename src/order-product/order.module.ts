import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { PrismaClient } from "@prisma/client";
import { UsersModule } from "../users/users.module";
import { AuthModule } from "../auth/auth.module";
import { ProductModule } from "../Products/Products.module";




@Module({
    imports: [UsersModule, AuthModule, ProductModule ],
    providers:[OrderService, PrismaClient],
    controllers:[OrderController],
    exports:[OrderService]
})
export class OrderModule {}