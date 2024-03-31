import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyparser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/payments/webhook', bodyparser.raw({ type: 'application/json' }));

  const config = new DocumentBuilder()
    .setTitle('Vendas-online-api')
    .setDescription('aplicação em nestjs para api de um sistema de vendas')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  app.enableCors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: 'https://projeto-vendas.vercel.app/',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  })
  app.useGlobalPipes(new ValidationPipe())


  await app.listen(4000);
}
bootstrap();
