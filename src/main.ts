import { Environment } from './env.validation';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as path from 'path';

const env =
  process.env.NODE_ENV === Environment.Development ? '.env.dev' : '.env.prod';
dotenv.config({ path: path.join(__dirname, `../${env}`) });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CLIENT_URL,
  });
  await app.listen(process.env.port);
}
bootstrap();
