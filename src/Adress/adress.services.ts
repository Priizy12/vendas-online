import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { AdressDTO } from "./dto/adress-create.dto";
import { AdressUpdateDTO } from "./dto/adress-update.dto";
import { UsersService } from "../users/users.service";



@Injectable()
export class AdressService {

    constructor(
        private readonly prisma: PrismaClient,
        private readonly usersService: UsersService
        ) { }

    async saveAdress(data: AdressDTO, userId: number) {

         await this.usersService.readById(userId)
        
         const adress = await this.prisma.adress.create({
            data
         });
        
         return adress;
    };

    async getAdress(userId: number) {
        try {
            const adress = await this.prisma.adress.findMany({
                where: {
                 userId
                }
            });
            return adress;
        } catch (error) {
            console.log(error)
            throw new BadRequestException("Não foi possivel visualizar o endereço do usuario")
        }
    };

    async updateAdress() {
        
    }


    
}