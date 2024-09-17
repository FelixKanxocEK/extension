import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config/dist';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({ origin: '*', methods: ['GET', 'PUT', 'POST', 'DELETE'] });
  const configService = app.get(ConfigService);
  app.use(bodyParser.json({ limit: '10mb' }));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, })); 
  await app.listen(configService.get('API_PORT'), configService.get('API_IP'));
}
bootstrap();
