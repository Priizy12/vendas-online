import { Module } from "@nestjs/common";
import { AdressService } from "./adress.services";
import { PrismaClient } from "@prisma/client";
import { AdressController } from "./adress.controller";




@Module({
    imports: [],
    providers: [AdressService, PrismaClient],
    controllers: [AdressController]
})

export class AdressModule {}