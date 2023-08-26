import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { generateSwaggerDocument, generateSwaggerSpec } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV !== 'production') {
    const document = generateSwaggerDocument(app);
    generateSwaggerSpec(app);
    SwaggerModule.setup('api', app, document);
  }
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
