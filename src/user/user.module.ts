import { RepositoryModule } from './../repository/repository.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  providers: [UserResolver, UserService],
  imports: [RepositoryModule],
  exports: [UserService],
})
export class UserModule {}
