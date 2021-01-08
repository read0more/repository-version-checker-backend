import { PrismaService } from './../prisma/prisma.service';
import { PrismaModule } from './../prisma/prisma.module';
import { CreateUserDto } from './../prisma/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    controller = module.get<AuthController>(AuthController);
    const envFile = path.resolve(__dirname, '../../.env.dev');
    process.env.DATABASE_URL = dotenv.parse(
      fs.readFileSync(envFile),
    ).DATABASE_URL;
  });

  describe('githubLoginRedirect 테스트', () => {
    const user: CreateUserDto = {
      githubId: `test_id${Date.now()}`,
      username: 'read0more',
      profileImage: 'https://profile_url.com',
    };

    it('githubLoginRedirect 테스트', async () => {
      const result = await controller.githubLoginRedirect({ user } as any);
      expect(result).toBe(user);
    });

    afterAll(async () => {
      await prismaService.user.delete({
        where: {
          githubId: user.githubId,
        },
      });
    });
  });
});
