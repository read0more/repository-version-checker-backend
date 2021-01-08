import { GithubStrategy } from './github.strategy';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [AuthService, GithubStrategy],
})
export class AuthModule {}
