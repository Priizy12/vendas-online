/*
import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { UserRepositoryMock } from '../testing/user-repository.mock';
import { userEntityList } from '../testing/user-entity-list.mock'
import { data } from "../testing/create-user-dto.mock";
import { Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { updateUserDTO } from "../testing/update-user-dto.mock";

describe('UserService', () => {

    let userService: UsersService
    let userRepository: Repository<UserEntity>
    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                UserRepositoryMock
            ]
        }).compile();

        userService = module.get<UsersService>(UsersService)
        userRepository = module.get(getRepositoryToken(UserEntity))
    });

    describe('Create', () => {

        test('create method', async () => {

            jest.spyOn(userRepository, 'findOneBy')
            .mockResolvedValueOnce(null);

            const result = await userService.create(data)

            expect(result).toEqual(userEntityList[0])
        })

    });
    
    describe('Get', () => {

        test('GET method', async () => {

            const result = await userService.read()

            expect(result).toEqual(userEntityList)
        })

    })
    describe('GetById', () => {

        test('getById method', async () => {

            const result = await userService.readById(1)

            expect(result).toEqual(userEntityList[0])
        })

    })
    describe('update', () => {

        test('getById method', async () => {

            const result = await userService.update(1, updateUserDTO )

            expect(result).toEqual(userEntityList[0])
        })

    })
    describe('delete', () => {
        test('getById method', async () => {

            const result = await userService.delete(1)

            expect(result).toEqual(true)
        })

    })
});
*/