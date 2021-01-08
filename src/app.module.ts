import { AllExceptionsFilter } from './common/filters/all-exception.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { GithubStrategy } from './auth/github.strategy';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { validate, Environment } from './env.validation';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    AuthModule,
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
  providers: [
    AppService,
    AuthService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
