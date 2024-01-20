/*
import { Test, TestingModule } from "@nestjs/testing"
import { UsersController } from "./users.controller"
import { UserServiceMock } from "../testing/user.service.mock"
import { AuthGuard } from "../guards/auth.guard"
import { GuardMock } from "../testing/guardMock"
import { RoleGuard } from "../guards/role.guard"
import { UsersService } from "./users.service"
import { CreateUserDTO } from "./dto/create-user.dto"
import { userEntityList } from "../testing/user-entity-list.mock"
import { UpdateUserDto } from "./dto/update-user.dto"





describe('Users Controller', () => {

    let usersController: UsersController
    let usersService: UsersService

    beforeEach( async() => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ UsersController],
            providers: [UserServiceMock]
        })
        .overrideGuard(AuthGuard).
        useValue(GuardMock).
        overrideGuard(RoleGuard).
        useValue(GuardMock).
        compile();


        usersController = module.get<UsersController>(UsersController)
        usersService = module.get<UsersService>(UsersService)
    });  
    
   

    describe('Teste para os Guards da aplicação', () => {

        test('se os guards estao aplicados', () => {

         const guards =  Reflect.getMetadata('__guards__', UsersController)

            expect(guards.length).toEqual(2);
            expect(new guards[0]()).toBeInstanceOf(AuthGuard)
            expect(new guards[1]()).toBeInstanceOf(RoleGuard)
        })

    })


    describe('Create', () => {

        test('create method', async () => {
            const result = await usersController.create(new CreateUserDTO);

            expect(result).toEqual(userEntityList[0])
        })

    })

    describe('Get Method', () => {

        test('GetAll method', async () => {
            const result = await usersController.get();

            expect(result).toEqual(userEntityList)
        })

        test('GetById method', async () => {
            const result = await usersController.getbyId(1);

            expect(result).toEqual(userEntityList[0])
        })

    })

    describe('update', () => {

        test('update method', async () => {
            const result = await usersController.update(new UpdateUserDto, 1);

            expect(result).toEqual(userEntityList[0])
        })

    })

    describe('delete', () => {

        test('delete method', async () => {
            const result = await usersController.delete(1);

            expect(result).toEqual(true)
        })

    });


});
*/