import { BadRequestException, Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthUpdateDTO } from "./dto/auth-updatePass.dto";
import { AuthService } from './auth.service';
import { FileInterceptor } from "@nestjs/platform-express";
import { FileService } from '../file/file.service';
import { AuthGuard } from "../guards/auth.guard";
import { User } from "../decorators/user.decorator";


@Controller()
export class AuthController {

    constructor(
        private readonly AuthService: AuthService,
        private readonly FileService: FileService
    ) { }

    @Post('registrar')
    async register(@Body() data: AuthRegisterDTO) {
        return this.AuthService.register(data)
    }

    @Post('login')
    async Login(@Body() { email, senha }: AuthDTO) {
        return this.AuthService.Login({ email, senha })
    }

    @Post('Forget')
    async forget(@Body() {email}: AuthForgetDTO) {
        return this.AuthService.forget(email)
    }

    @Post('UpdatePass')
    async updatePass(@Body() {senha, token}: AuthUpdateDTO, id: number) {
        return this.AuthService.updatePass( senha, token, id)
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User() user) {
        return {
            user
        }
    }


    /*
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    @Post('photo')
    async photo(@User()  user: UserEntity, @UploadedFile('file', new ParseFilePipe({
        validators: [
            new FileTypeValidator({ fileType: 'image/png' }),
            new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 8 })
        ]
    })) photo: Express.Multer.File) {

        const filename = `photo${user.id}.png`

        try {
            await this.FileService.upload(photo, filename)
        } catch (error) {
            throw new BadRequestException(error)
        }

        return photo;
    }

*/
}