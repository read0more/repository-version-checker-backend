import { User } from './interfaces/user.interface';
import { Request } from 'express';
import { GithubAuthGuard } from './github-auth.guard';
import { AuthService } from './auth.service';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/github/login')
  @UseGuards(new GithubAuthGuard())
  githubLogin() {}

  @Get('/github/redirect')
  @UseGuards(new GithubAuthGuard())
  githubLoginRedirect(@Req() request: Request): User {
    return this.authService.githubLogin(request.user);
  }
}
