import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('githubLogin함수 user object 정상적으로 받았을 때', () => {
    const user = { name: 'read0more' };
    expect(
      service.githubLogin({
        name: 'read0more',
      }),
    ).toEqual(user);
  });

  it('githubLogin함수 user object 못 받았을 때', () => {
    expect(() => service.githubLogin(null)).toThrow(HttpException);
  });
});
