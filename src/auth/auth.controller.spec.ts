/*import { Test, TestingModule } from "@nestjs/testing"
import { AuthController } from "./auth.controller"
import { AuthService } from './auth.service';
import { FileService } from "../file/file.service"
import { AuthGuard } from "../guards/auth.guard"
import { GuardMock } from "../testing/guardMock"
import { RoleGuard } from "../guards/role.guard"
import { dataLogin } from "../testing/Login-user-dto.mock";
import { accessToken } from "../testing/accesstoken.mock";
import { JwtServiceMock } from "../testing/jwt-service.mock";
import { MailerServiceMock } from "../testing/mailer.service.mock";
import { userEntityList } from '../testing/user-entity-list.mock';
import { UserServiceMock } from "../testing/user.service.mock";
import { UserRepositoryMock } from "../testing/user-repository.mock";
import { data } from "../testing/create-user-dto.mock";
import { ForgetDto } from "../testing/forget-user-dto.mock";
import { UpdatePassDto } from "../testing/updatePass-user-dto.mock";
import { GetFile } from "../testing/file-upload.mock";



describe('AuthController', () => {

    let authController: AuthController
    let fileService: FileService
    let authService: AuthService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                AuthService,
                FileService,
                JwtServiceMock,
                MailerServiceMock,
                UserRepositoryMock,
                UserServiceMock
            ]
        })
            .overrideGuard(AuthGuard).
            useValue(GuardMock)
            .compile()

        authController = module.get<AuthController>(AuthController)
        fileService = module.get<FileService>(FileService)
        authService = module.get<AuthService>(AuthService)
    })


    describe('Fluxo de autenticação do usuário', () => {

        test('Login method', async () => {
            const result = await authController.Login(dataLogin)
            expect(result).toEqual({ accessToken });
        })


        test('Register method', async () => {
            const result = await authController.register(data)
            expect(result).toEqual({ accessToken });
        })

        test('Forget method', async () => {
            const result = await authController.forget(ForgetDto)
            expect(result).toEqual(true);
        })

        test('Update Pass method', async () => {

            const result = await authController.updatePass(UpdatePassDto)

            expect(result).toEqual({ accessToken });
        })
    })

    describe('Rotas autenticadas', () => {

        test('upload test', async () => {

            const photo = await GetFile()
            const result = await authController.photo(userEntityList[0], photo)
            expect(result).toEqual(photo);

        })

    })



})
*/