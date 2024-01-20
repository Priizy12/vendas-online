/*
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserEntity } from "../users/entities/user.entity";
import { userEntityList } from "./user-entity-list.mock";



export const UserRepositoryMock = {

    provide: getRepositoryToken(UserEntity),
    useValue: {
        create: jest.fn(),
        find: jest.fn().mockResolvedValue(userEntityList),
        findOneBy: jest.fn().mockResolvedValue(userEntityList[0]),
        update: jest.fn().mockResolvedValue(userEntityList[0]),
        delete: jest.fn().mockResolvedValue(true),
        save: jest.fn().mockResolvedValue(userEntityList[0])

    }


}

*/