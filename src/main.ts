import { Environment } from './env.validation';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:
      process.env.NODE_ENV === Environment.Development
        ? 'http://localhost:3001'
        : '',
  });
  await app.listen(3000);
}
bootstrap();
