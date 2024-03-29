import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { PrismaClient } from "@prisma/client";



@Module({
    providers:[OrderService, PrismaClient],
    controllers:[OrderController],
    exports:[OrderService]
})
export class OrderModule {}