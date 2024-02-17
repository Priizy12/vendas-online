import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { AdressDTO } from "./dto/adress-create.dto";
import { AdressUpdateDTO } from "./dto/adress-update.dto";



@Injectable()
export class AdressService {

    constructor(private readonly prisma: PrismaClient) { }

    async saveAdress(data: AdressDTO) {

        try {
            const adress = await this.prisma.adress.create({
                data
            });

            return adress;
        } catch (error) {
            console.log(error)
            throw new BadRequestException("Não foi possivel inserir o endereço do usuario")
        }

    };

    async getAdress() {
        try {
            const adress = await this.prisma.adress.findMany();
            return adress;
        } catch (error) {
            console.log(error)
            throw new BadRequestException("Não foi possivel visualizar o endereço do usuario")
        }
    };


    async updateAdress({ CEP, numero, complemento, ponto_de_referencia, bairro, estado, cidade, telefone_contato, endereco_id, }: AdressUpdateDTO, id: number) {

        try {
            const AdressExist = await this.prisma.adress.findFirst({
                where: {
                    id
                }
            });

            if (!AdressExist) throw new BadRequestException("Esse endereço não existe!");

            const newAdress = await this.prisma.adress.update({
                where: {
                    id
                },
                data: {
                    CEP,
                    numero,
                    complemento,
                    ponto_de_referencia,
                    bairro,
                    estado,
                    cidade,
                    telefone_contato,
                    endereco_id
                }
            })

            return { sucess: true }
        } catch (error) {
            console.log(error)
            throw new BadRequestException("Não foi possivel atualizar informações do endereço, por favor verifique os campos e preencha corretamente.")
        }

    }


    async deleteAdress(id: number) {

        try {
            const AdressExist = await this.prisma.adress.findFirst({
                where: {
                    id
                }
            });

            if (!AdressExist) throw new BadRequestException("Esse endereço não existe!");

            const adress = await this.prisma.adress.delete({
                where: {
                   id:Number(id) 
                }
            })
        

            return { sucess: true }
        } catch (error) {
            console.log(error)
            throw new BadRequestException("Não foi possivel deletar o endereço, por favor atualize a pagina e tente novamente!")
        }

    }
}