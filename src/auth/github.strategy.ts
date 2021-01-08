import { User } from './interfaces/user.interface';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('GITHUB_CLIENT_ID'),
      clientSecret: configService.get('GITHUB_CLIENT_SECRET'),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const user: User = {
      id: profile.id,
      email: profile.username,
      profileImage: profile.photos[0].value,
    };

    done(null, user);
  }
}
