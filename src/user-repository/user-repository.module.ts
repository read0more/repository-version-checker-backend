import { Module } from '@nestjs/common';
import { UserRepositoryService } from './user-repository.service';
import { UserRepositoryResolver } from './user-repository.resolver';

@Module({
  providers: [UserRepositoryResolver, UserRepositoryService]
})
export class UserRepositoryModule {}
