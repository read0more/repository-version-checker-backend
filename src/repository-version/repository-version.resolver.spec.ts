import { Test, TestingModule } from '@nestjs/testing';
import { RepositoryVersionResolver } from './repository-version.resolver';
import { RepositoryVersionService } from './repository-version.service';

describe('RepositoryVersionResolver', () => {
  let resolver: RepositoryVersionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepositoryVersionResolver, RepositoryVersionService],
    }).compile();

    resolver = module.get<RepositoryVersionResolver>(RepositoryVersionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
