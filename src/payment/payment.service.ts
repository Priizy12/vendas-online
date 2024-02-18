import { Injectable } from "@nestjs/common";
import { Adress, Produtos, users } from "@prisma/client";
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: String(process.env.MP_ACCESS_TOKEN), options: { timeout: 5000, idempotencyKey: 'abc' } });

const payment = new Payment(client);

@Injectable()
export class PaymentServiceOrder {



}