import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );

  app.enableCors({
    origin: configService.get<string>('CLIENT_URL'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: [
      'Accept',
      'Authorization',
      'Access-Control-Allow-Credential',
      'Allow-Credential',
      'Cache-Control',
      'Content-Type',
      'Origin',
      'Pragma',
      'Referer',
      'Sec-Fetch-Dest',
      'Sec-Fetch-Mode',
      'Sec-Fetch-Site',
      'User-Agent',
      'x-signature',
      'x-timestamp',
    ],
  });

  app.use('/uploads', express.static('uploads'));

  await app.listen(port);
  console.log(`Server running on http://localhost:${port}`);
}

bootstrap();
