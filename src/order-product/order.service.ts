import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { OrderDto } from "./dtos/order.dto";







@Injectable()
export class OrderService {

    constructor(private readonly prisma: PrismaClient) { }


}