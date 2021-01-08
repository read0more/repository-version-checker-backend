import { CreateUserDto } from './../prisma/dto/create-user.dto';
import { PrismaService } from './../prisma/prisma.service';
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
  async githubLoginRedirect(@Req() request: Request): Promise<CreateUserDto> {
    const user = this.authService.githubLogin(request.user);
    const dbUser = await this.prismaService.user.findUnique({
      where: {
        githubId: user.githubId,
      },
    });

    if (!dbUser) {
      await this.prismaService.user.create({
        data: user,
      });
    }

    return user;
  }
}
