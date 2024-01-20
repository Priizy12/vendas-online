import { CanActivate } from "@nestjs/common";

export const GuardMock: CanActivate =  {
    canActivate: jest.fn(() => true)
}