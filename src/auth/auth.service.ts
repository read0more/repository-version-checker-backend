import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  githubLogin(user: User): string {
    return this.jwtService.sign(user);
  }

  logout(response: Response) {
    response.clearCookie('Authorization');
  }
}
