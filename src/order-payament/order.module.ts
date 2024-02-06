import { PrismaClient } from '@prisma/client';
import { OrderService } from './order.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [],
    providers: [
        OrderService, PrismaClient],
})
export class OrderModule { }
