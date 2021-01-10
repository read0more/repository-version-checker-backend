import { CreateUserInput } from './../user/dto/create-user.input';
import { GithubAuthGuard } from './guards/github-auth.guard';
import { UserService } from './../user/user.service';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';

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
    const user = request.user as CreateUserInput;
    const userJwt = this.authService.githubLogin(user);
    const dbUser = await this.userService.findOne(user.githubId);

    if (!dbUser) {
      await this.userService.create(user);
    }

    return userJwt;
  }
}
