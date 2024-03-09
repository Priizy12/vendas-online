import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { InserCartDto } from './dtos/insert-cart.dto';
import { CartService } from './cart.service';
import { User } from '../decorators/user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Paramid } from '../decorators/param-id.decorator';





@ApiTags('Carrinho')
@Controller('cart')
export class CartController {

    constructor(private readonly cartService: CartService) { }


    @UseGuards(AuthGuard)
    @Post('insert')
    async createCart(@Body() data: InserCartDto, @User() userId: number) {
        return this.cartService.insertProductInCart(data, userId)
    }


    @UseGuards(AuthGuard)
    @Get('find')
    async findCartByUserId( @User() userId: number) {
        return this.cartService.findCartByUserId(userId)
    }

    @UseGuards(AuthGuard)
    @Delete('clear')
    async clearCart(@User() userId: number) {
        return this.cartService.clearCart(userId)
    }


    @UseGuards(AuthGuard)
    @Delete(':id')
    async DeleteProductInCart(@Paramid() produtoId: number, @User() userId: number) {
        return this.cartService.deleteProductInCart(produtoId, userId)
    }

}