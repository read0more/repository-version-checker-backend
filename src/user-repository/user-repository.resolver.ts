import { Repository } from './../repository/entities/repository.entity';
import { GithubService } from './../repository/github.service';
import { RepositoryVersionService } from './../repository-version/repository-version.service';
import { RepositoryService } from './../repository/repository.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser } from './../auth/decorator/current-user.decorator';
import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { UserRepositoryService } from './user-repository.service';
import { UserRepository } from './entities/user-repository.entity';
import { CreateUserRepositoryInput } from './dto/create-user-repository.input';
import { User } from 'src/user/entities/user.entity';
import { UserInputError } from 'apollo-server-core';

@Resolver(() => UserRepository)
@UseGuards(GqlAuthGuard)
export class UserRepositoryResolver {
  constructor(
    private readonly userRepositoryService: UserRepositoryService,
    private readonly repositoryService: RepositoryService,
    private readonly repositoryVersionService: RepositoryVersionService,
    private readonly githubService: GithubService,
  ) {}

  @Mutation(() => UserRepository)
  async createUserRepository(
    @Args('createUserRepositoryInput')
    createUserRepositoryInput: CreateUserRepositoryInput,
    @CurrentUser() user: User,
  ) {
    // repository 정보가 이미 테이블에 있는지 확인
    const [owner, repositoryName] = this.githubService.splitGithubUrl(
      createUserRepositoryInput.repositoryUrl,
    );
    const name = `${owner}/${repositoryName}`;
    let targetRepository: Repository = await this.repositoryService.findOneByName(
      name,
    );

    if (targetRepository) {
      const existUserRepository = await this.userRepositoryService.findOne(
        targetRepository.id,
      );

      if (existUserRepository) {
        throw new UserInputError('이미 추가한 Repository 입니다.', {
          invalidArgs: createUserRepositoryInput.repositoryUrl,
        });
      }
    } else {
      // 정보가 없다면 DB에 repository생성 레코드 생성 후, API로 repository_version 추가
      targetRepository = await this.repositoryService.create({
        name,
      });
    }

    await this.githubService.updateReleaseInfo(
      targetRepository,
      owner,
      repositoryName,
    );

    return this.userRepositoryService.create(
      createUserRepositoryInput,
      user.id,
      targetRepository.id,
    );
  }

  @Mutation(() => UserRepository)
  async removeUserRepository(@Args('id', { type: () => Int }) id: number) {
    return this.userRepositoryService.remove(id);
  }
}
