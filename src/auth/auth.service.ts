import { CreateUserInput } from './../user/dto/create-user.input';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  githubLogin(user: CreateUserInput): string {
    return this.jwtService.sign(user);
  }
}
