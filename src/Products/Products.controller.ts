import { Body, Controller, Delete, Get, Post, Put, UseGuards } from "@nestjs/common";
import { Paramid } from "src/decorators/param-id.decorator";
import { AuthGuard } from "src/guards/auth.guard";
import { ProductService } from './Products.service';
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";


@UseGuards(AuthGuard)

@Controller('Product')
export class ProductController {

    constructor(
        private readonly ProductService: ProductService
    ) { }

   
    @Get()
    async getProduct() {
        return this.ProductService.get()
    }

   
    @Get(':id')
    async getProductById(@Paramid() id) {
        return this.ProductService.getById(id)
    }

    
    @Post('create')
    async createProduct(@Body() data: CreateProductDto) {
        return this.ProductService.create(data)
    }

    
    @Put(':id')
    async updateProduct(@Body() data: UpdateProductDto, @Paramid() id) {
        return this.ProductService.update(id, data)
    }

    
    @Delete(':id')
    async deleteProduct(@Paramid() id_produto) {
        return this.ProductService.delete(id_produto)
    }
}