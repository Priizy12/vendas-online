import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Vendas-online-api')
    .setDescription('aplicação em nestjs para api de um sistema de vendas')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);




  app.enableCors();
  app.useGlobalPipes(new ValidationPipe())


  await app.listen(4000);
}
bootstrap();
