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
  ) {}

  @Get('/test')
  test(@Req() req: Request) {
    console.log(req.cookies);
  }

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

    response.cookie('Authorization', jwt, {
      httpOnly: true,
    });

    return response.redirect('http://localhost:3001');
  }
}
