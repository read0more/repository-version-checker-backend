import { GithubService } from './../repository/github.service';
import { UnauthenticatedException } from '../auth/exceptions/unauthenticated.exception';
import { GqlAuthGuard } from './../auth/guards/gql-auth.guard';
import { CurrentUser } from './../auth/decorator/current-user.decorator';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly githubService: GithubService,
  ) {}

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOneById(id);
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: User) {
    // userRepository 버전 정보 갱신
    const userByDB = await this.userService.findOneById(user.id);
    const batchs = userByDB.repositories.map(
      async ({ repository, repositoryUrl }) => {
        const [owner, repositoryName] = this.githubService.splitGithubUrl(
          repositoryUrl,
        );

        const versions = await this.githubService.getRepositoryReleasesInfo(
          owner,
          repositoryName,
        );

        return this.githubService.updateReleaseInfo(repository, versions);
      },
    );

    await Promise.all(batchs);
    return this.userService.findOneById(user.id);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  removeUser(@Args('githubId') githubId: string, @CurrentUser() user: User) {
    if (user.githubId !== githubId) {
      throw UnauthenticatedException;
    }

    return this.userService.remove(githubId);
  }
}
