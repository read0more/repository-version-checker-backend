import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthService {
  githubLogin(user) {
    if (!user) {
      throw new HttpException('Unauthorized.', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
