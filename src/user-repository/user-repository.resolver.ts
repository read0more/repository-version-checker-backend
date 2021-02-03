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
import { isAfter, subMinutes } from 'date-fns';
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
        user.id,
        targetRepository.id,
      );

      if (existUserRepository) {
        throw new UserInputError('이미 추가한 Repository 입니다.', {
          invalidArgs: createUserRepositoryInput.repositoryUrl,
        });
      }

      // 정보가 있다면 마지막 업데이트가 30분이 지났는지 확인
      if (
        isAfter(
          subMinutes(new Date(), 30),
          new Date(targetRepository.updatedAt),
        )
      ) {
        // 지났다면 API로 repository_version기존 내용 지우고 테이블에 다시 넣어 갱신, repository의 updatedAt을 갱신
        await this.repositoryVersionService.removeByRepositoryId(
          targetRepository.id,
        );

        await this.githubService.updateReleaseInfo(
          targetRepository.id,
          owner,
          repositoryName,
        );

        await this.repositoryService.update(targetRepository.id, {
          updatedAt: new Date(),
        });
      }
    } else {
      // 정보가 없다면 API로 repository, repository_version 갱신, 해당 내용을 추가
      targetRepository = await this.repositoryService.create({
        name,
      });

      await this.githubService.updateReleaseInfo(
        targetRepository.id,
        owner,
        repositoryName,
      );
    }

    return this.userRepositoryService.create(
      createUserRepositoryInput,
      user.id,
      targetRepository.id,
    );
  }

  @Mutation(() => UserRepository)
  removeUserRepository(
    @Args('repositoryId', { type: () => Int }) repositoryId: number,
    @CurrentUser() user: User,
  ) {
    return this.userRepositoryService.remove(user.id, repositoryId);
  }
}
