import { RepositoryVersionModule } from './../repository-version/repository-version.module';
import { GithubService } from './github.service';
import { HttpModule, Module } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { RepositoryResolver } from './repository.resolver';

@Module({
  imports: [HttpModule, RepositoryVersionModule],
  providers: [RepositoryResolver, RepositoryService, GithubService],
  exports: [RepositoryService, GithubService],
})
export class RepositoryModule {}
