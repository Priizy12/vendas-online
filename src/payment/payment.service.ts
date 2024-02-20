// Passo 1: Importe as partes do módulo que você deseja usar
import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Payment } from 'mercadopago';

@Injectable()
export class PaymentService {
  private client: MercadoPagoConfig;
  private payment: Payment;

  constructor() {
    
    this.client = new MercadoPagoConfig({
      accessToken: 'TEST-443634622445814-021711-25c4ef9249e57592b02ed3ddcc8f3003-1257615611',
      options: {
        timeout: 5000,
        idempotencyKey: 'abc'
      }
    });

    
    this.payment = new Payment(this.client);
  }

  async createPayment() {
  
    const body = {
      transaction_amount: 12.34,
      description: 'DESCRIÇÃO',
      payment_method_id: 'debmaster',
      payer: {
        email: 'kayo@gmail.com'
      },
      token: ''
    };


    const requestOptions = {
      idempotencyKey: 'IDEMPOTENCY_KEY',
    };


    try {
      const response = await this.payment.create({ body, requestOptions });

  
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}
