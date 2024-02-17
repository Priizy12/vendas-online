import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { AdressDTO } from "./dto/adress-create.dto";
import { AdressUpdateDTO } from "./dto/adress-update.dto";
import { Paramid } from "../decorators/param-id.decorator";
import { AdressService } from "./adress.services";
import { ApiTags } from "@nestjs/swagger";


@ApiTags("Controle de Endereços")
@Controller('Endereco')
export class AdressController {

    constructor(private readonly adressService: AdressService) { }

    @Get()
    async getAdress() {
        return this.adressService.getAdress();
    }

    @Post()
    async saveAdress(@Body() data: AdressDTO) {
        return this.adressService.saveAdress(data);
    }

    @Put(':id')
    async updateAdress(@Body() data: AdressUpdateDTO, @Paramid() id: number) {
        return this.adressService.updateAdress(data, id)
    }

    @Delete(':id')
    async deleteAdress(@Paramid() id: number) {
        return this.adressService.deleteAdress(id)
    }


}