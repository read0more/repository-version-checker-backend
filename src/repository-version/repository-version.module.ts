import { Module } from '@nestjs/common';
import { RepositoryVersionService } from './repository-version.service';
import { RepositoryVersionResolver } from './repository-version.resolver';

@Module({
  providers: [RepositoryVersionResolver, RepositoryVersionService]
})
export class RepositoryVersionModule {}
