import { JwtStrategy } from './jwt.strategy';
import { JWT_EXPIRES_IN, JWT_SECRET } from './../common/constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './../user/user.module';
import { GithubStrategy } from './github.strategy';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(JWT_SECRET),
        signOptions: { expiresIn: JWT_EXPIRES_IN },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GithubStrategy, JwtStrategy],
})
export class AuthModule {}
