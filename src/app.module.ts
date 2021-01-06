import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { validate, Environment } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === Environment.Development
          ? '.env.dev'
          : '.dev.prod',
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
