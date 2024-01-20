import { IsNumber } from "class-validator";



export class InserCartDto {

    @IsNumber()
    produtoId: number

}