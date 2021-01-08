import { PrismaService } from './../prisma/prisma.service';
import { User } from './interfaces/user.interface';
import { Request } from 'express';
import { GithubAuthGuard } from './github-auth.guard';
import { AuthService } from './auth.service';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get('/github/login')
  @UseGuards(new GithubAuthGuard())
  githubLogin() {}

  @Get('/github/redirect')
  @UseGuards(new GithubAuthGuard())
  async githubLoginRedirect(@Req() request: Request): Promise<User> {
    return this.authService.githubLogin(request.user);
  }
}
