import { Test, TestingModule } from '@nestjs/testing';
import { UserRepositoryResolver } from './user-repository.resolver';
import { UserRepositoryService } from './user-repository.service';

describe('UserRepositoryResolver', () => {
  let resolver: UserRepositoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepositoryResolver, UserRepositoryService],
    }).compile();

    resolver = module.get<UserRepositoryResolver>(UserRepositoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
