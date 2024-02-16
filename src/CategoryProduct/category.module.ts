import { Module } from "@nestjs/common";
import { CategoryProductService } from "./category.service";
import { PrismaClient } from "@prisma/client";
import { CategoryProductController } from "./category.controller";




@Module({
    imports: [],
    providers: [CategoryProductService, PrismaClient],
    controllers: [CategoryProductController]
})



export class CategoryProductModule {}