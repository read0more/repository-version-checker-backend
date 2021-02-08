import { CLIENT_LOGIN_URL } from './../common/constants';
import { ConfigService } from '@nestjs/config';
import { GithubAuthGuard } from './guards/github-auth.guard';
import { UserService } from './../user/user.service';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Get('/github/login')
  @UseGuards(GithubAuthGuard)
  githubLogin() {}

  @Get('/github/redirect')
  @UseGuards(GithubAuthGuard)
  async githubLoginRedirect(
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const user = request.user as User;
    let dbUser = await this.userService.findOneByGithubId(user.githubId);

    if (!dbUser) {
      dbUser = await this.userService.create(user);
    }

    const jwt = this.authService.githubLogin(dbUser);

    return response.redirect(
      `${this.configService.get(CLIENT_LOGIN_URL)}?jwt=${jwt}`,
    );
  }
}
