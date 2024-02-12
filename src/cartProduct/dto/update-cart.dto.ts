import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";



export class UpdateCartDto {

    @ApiProperty()
    @IsNumber()
    amount: number

}
