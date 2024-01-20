import { Module, forwardRef } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { FileModule } from "src/file/file.module";
import { PrismaClient } from "@prisma/client";
import { PrismaModule } from '../database/prisma.module';




@Module({
    imports: [JwtModule.register({
        secret: String(process.env.JWT_SECRET),
        
    }),
    forwardRef(() => UsersModule),
        FileModule,
        PrismaModule
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtService, PrismaClient],
    exports: [AuthModule, AuthService]
})


export class AuthModule { }