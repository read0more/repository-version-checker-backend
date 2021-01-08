import { User } from './interfaces/user.interface';
import { AuthService } from './auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    service = await module.resolve(AuthService);
    controller = module.get<AuthController>(AuthController);
  });

  it('githubLoginRedirect 테스트', () => {
    const user: User = {
      id: 'test_id',
      email: 'read0more@gmail.com',
      profileImage: 'https://profile_url.com',
    };

    expect(controller.githubLoginRedirect({ user } as any)).toBe(user);
  });
});
