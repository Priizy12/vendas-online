import { Body, Controller, Post } from '@nestjs/common';
import { CartProductService } from './cart_product.service';
import { InserCartDto } from './dto/insert-cart.dto';
import { ApiTags } from '@nestjs/swagger';





@Controller('cart')
@ApiTags('Controle de Carrinho de produtos.')
export class CartProductController {

    constructor(private readonly cartproductService: CartProductService) {}

@Post('insert')
 async insert (@Body() data: InserCartDto) {
    return this.cartproductService.addToCart(data)
 }

}