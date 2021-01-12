import { RepositoryVersionModule } from './../repository-version/repository-version.module';
import { RepositoryModule } from './../repository/repository.module';
import { Module } from '@nestjs/common';
import { UserRepositoryService } from './user-repository.service';
import { UserRepositoryResolver } from './user-repository.resolver';

@Module({
  imports: [RepositoryModule, RepositoryVersionModule],
  providers: [UserRepositoryResolver, UserRepositoryService],
})
export class UserRepositoryModule {}
