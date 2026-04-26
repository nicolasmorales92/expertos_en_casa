import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './seeder/seeder.service';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Borra campos que no estén en el DTO
    forbidNonWhitelisted: true, // Tira error si mandan campos de más
    transform: true, // Convierte tipos automáticamente
  }));


  const configSwagger = new DocumentBuilder()
    .setTitle('Expertos en Casa API')
    .setDescription('Documentación de la API para servicios del hogar')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);


  const seeder = app.get(SeederService);
  await seeder.seeder();

  
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
