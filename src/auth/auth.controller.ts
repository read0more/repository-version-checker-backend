import { GithubAuthGuard } from './guards/github-auth.guard';
import { UserService } from './../user/user.service';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('/github/login')
  @UseGuards(GithubAuthGuard)
  githubLogin() {}

  @Get('/github/redirect')
  @UseGuards(GithubAuthGuard)
  async githubLoginRedirect(@Req() request: Request): Promise<string> {
    // todo: 깃헙 콜백URL은 client쪽으로 바꾸고 해당 정보 받아서 db에 생성하고 jwt리턴하게 변경
    const user = request.user as User;
    let dbUser = await this.userService.findOneByGithubId(user.githubId);

    if (!dbUser) {
      dbUser = await this.userService.create(user);
    }

    return this.authService.githubLogin(dbUser);
  }
}
