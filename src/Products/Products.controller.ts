import { Body, Controller, Delete, Get, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { Paramid } from "src/decorators/param-id.decorator";
import { AuthGuard } from "src/guards/auth.guard";
import { ProductService } from './Products.service';
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ApiTags } from "@nestjs/swagger";
import { FileService } from "../file/file.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileDTO } from "./dto/file-product.dto";
import { RoleGuard } from "../guards/role.guard";
import { Roles } from "../decorators/role.decorator";
import { Role } from "../enums/role.enum";


@UseGuards(AuthGuard)
@Controller('Product')
@ApiTags('Controle de Produtos')
export class ProductController {

    constructor(
        private readonly ProductService: ProductService,
        private readonly FileService: FileService
    ) { }


    @Get()
    async getProduct() {
        return this.ProductService.get()
    }


    @Get(':id')
    async getProductById(@Paramid() id) {
        return this.ProductService.getById(id)
    }

    @UseGuards(RoleGuard)
    @Roles(Role.Admin)
    @Post('create')
    async createProduct(@Body() data: CreateProductDto) {
        return this.ProductService.create(data)
    }


    @UseGuards(RoleGuard)
    @Roles(Role.Admin)
    @Put(':id')
    async updateProduct(@Body() data: UpdateProductDto, @Paramid() id) {
        return this.ProductService.update(id, data)
    }

    @UseGuards(RoleGuard)
    @Roles(Role.Admin)
    @UseInterceptors(FileInterceptor('file'))
    @Post('Image')
    async photoProduct(@UploadedFile() file: FileDTO, @Body('produtoId') produtoId: string) {
       return this.FileService.upload(file, Number(produtoId))
    }


    @UseGuards(RoleGuard)
    @Roles(Role.Admin)
    @Delete(':id')
    async deleteProduct(@Paramid() id_produto) {
        return this.ProductService.delete(id_produto)
    }
}