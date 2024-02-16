import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CategoryProductService } from './category.service';
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Paramid } from "../decorators/param-id.decorator";



@ApiTags('Controle de Categorias')
@Controller('Category')
export class CategoryProductController {

    constructor(private readonly categoryProduct: CategoryProductService) { }


    @Get()
    async getCategory() {
        return this.categoryProduct.getCategory()
    }

    @Post()
    async saveCategory(@Body() data: CreateCategoryDTO,) {
        return this.categoryProduct.createCategory(data)
    }


    @Put(':id')
    async updateCategory(@Body() data: UpdateCategoryDto, @Paramid() id) {
        return this.categoryProduct.update(data, id)
    }

    @Delete(':id')
    async deleteCategory(@Paramid() id) {
        return this.categoryProduct.delete(id)
    }

}