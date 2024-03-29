import { IsNumber } from "class-validator";

export class OrderDto {

    @IsNumber()
    adressId: number;

    @IsNumber()
    cartId: number;

    @IsNumber()
    userId: number;



}