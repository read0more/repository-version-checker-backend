import { GlobalModule } from './common/global.module';
import { RepositoryVersionModule } from './repository-version/repository-version.module';
import { RepositoryModule } from './repository/repository.module';
import { UserRepositoryModule } from './user-repository/user-repository.module';
import { UserModule } from './user/user.module';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { validate, Environment } from './env.validation';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GlobalModule,
    AuthModule,
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === Environment.Development
          ? '.env.dev'
          : '.dev.prod',
    }),
    GraphQLModule.forRoot({
      debug: process.env.NODE_ENV === Environment.Development,
      playground: process.env.NODE_ENV === Environment.Development,
      autoSchemaFile: 'schema.gql',
    }),
    RepositoryModule,
    RepositoryVersionModule,
    UserModule,
    UserRepositoryModule,
  ],
  providers: [
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
