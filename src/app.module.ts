import { GlobalModule } from './common/global.module';
import { RepositoryVersionModule } from './repository-version/repository-version.module';
import { RepositoryModule } from './repository/repository.module';
import { UserRepositoryModule } from './user-repository/user-repository.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { validate, Environment } from './env.validation';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { checkIntrospectionPlugin } from './apollo.plugins';

@Module({
  imports: [
    GlobalModule,
    AuthModule,
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === Environment.Development
          ? '.env.local'
          : '.env.prod',
    }),
    GraphQLModule.forRoot({
      debug: process.env.NODE_ENV === Environment.Development,
      playground: process.env.NODE_ENV === Environment.Development,
      autoSchemaFile: 'schema.gql',
      introspection: true,
      formatError: (error: GraphQLError) => {
        return error;
      },
      cors: {
        origin: process.env.CLIENT_URL,
        credentials: true,
      },
      plugins: [checkIntrospectionPlugin],
    }),
    RepositoryModule,
    RepositoryVersionModule,
    UserModule,
    UserRepositoryModule,
  ],
  providers: [],
})
export class AppModule {}
