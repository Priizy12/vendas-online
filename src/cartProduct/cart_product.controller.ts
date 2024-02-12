import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { CartProductService } from './cart_product.service';
import { InserCartDto } from './dto/insert-cart.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Paramid } from '../decorators/param-id.decorator';
import { AuthGuard } from '../guards/auth.guard';





@Controller('cart')
@ApiTags('Controle de Carrinho de produtos.')
export class CartProductController {

   constructor(private readonly cartproductService: CartProductService) { }


   @Get()
   async getProductInCart() {
      return this.cartproductService.GetProductInCart()
   }


   @Post('insert')
   async insert(@Body() data: InserCartDto, id_produto: number) {
      return this.cartproductService.addProductInCart(data, id_produto)
   }

   @Put(':id')
   async updateProduct(@Body() data: UpdateCartDto, @Paramid() id) {
      return this.cartproductService.UpdateProduct(data, id)
   }

   @Delete(':id')
   async removeProductIncart(@Paramid() produtoId) {
      return this.cartproductService.deleteProductInCart(produtoId)
   }


}