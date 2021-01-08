import { CreateUserDto } from './../prisma/dto/create-user.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthService {
  githubLogin(user): CreateUserDto {
    if (!user) {
      throw new HttpException('Unauthorized.', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
