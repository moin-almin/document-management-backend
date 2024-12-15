import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads'))); // Serve static files
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
