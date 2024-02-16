import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { AdressDTO } from "./dto/adress-create.dto";




@Injectable()
export class AdressService {

    constructor(private readonly prisma: PrismaClient) {}

    async saveAdress (data: AdressDTO) {

     try {
        const adress = await this.prisma.adress.create({
            data
        });

        return adress;
     } catch (error) {
        console.log(error)
        throw new BadRequestException("Não foi possivel inserir o endereço do usuario")
     }
        
    }

    async getAdress () {
        try {
            const adress = await this.prisma.adress.findMany();
            return adress;
        } catch (error) {
            console.log(error)
            throw new BadRequestException("Não foi possivel visualizar o endereço do usuario")
        }
    }

}