import { Test, TestingModule } from '@nestjs/testing';
import { RepositoryVersionService } from './repository-version.service';

describe('RepositoryVersionService', () => {
  let service: RepositoryVersionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepositoryVersionService],
    }).compile();

    service = module.get<RepositoryVersionService>(RepositoryVersionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
