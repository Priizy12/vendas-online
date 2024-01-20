/*
import { AuthService } from "./auth.service"
import { TestingModule, Test } from "@nestjs/testing"
import { UserRepositoryMock } from "../testing/user-repository.mock"
import { JwtServiceMock } from "../testing/jwt-service.mock"
import { UserServiceMock } from "../testing/user.service.mock"
import { MailerServiceMock } from "../testing/mailer.service.mock"
import { userEntityList } from "../testing/user-entity-list.mock"
import { accessToken } from "../testing/accesstoken.mock"
import { TokenPayload } from '../testing/tokenPayload.mock'
import { data } from "../testing/create-user-dto.mock"
import { dataLogin } from "../testing/Login-user-dto.mock"
import { ResetToken } from "../testing/Resettoken.mock"

describe('AuthService', () => {

    let authService: AuthService



    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                UserRepositoryMock,
                JwtServiceMock,
                UserServiceMock,
                MailerServiceMock
            ]
        }).compile();

        authService = module.get<AuthService>(AuthService);
    });

    describe('Token', () => {

        test('Create Token', () => {
            const result = authService.createToken(userEntityList[0]);

            expect(result).toEqual({
                accessToken
            });
        });

        test('Check Token', () => {
            const result = authService.checkToken(accessToken);

            expect(result).toEqual(TokenPayload);
        });
    });


    describe('Autenticação', () => {
        test('Login Method', async  () => {
            const result = await authService.Login(dataLogin);

            expect(result).toEqual({accessToken});
        });

        test('forget Method', async  () => {
            const result = await authService.forget('teste@gmail.com');

            expect(result).toEqual({sucess:true});
        });

        test('update Method', async  () => {
            const result = await authService.updatePass('1234567', ResetToken);

            expect(result).toEqual({accessToken});
        });
    })

});
*/
