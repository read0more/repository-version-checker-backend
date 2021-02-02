import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RepositoryVersionService } from './repository-version.service';
import { RepositoryVersion } from './entities/repository-version.entity';
import { CreateRepositoryVersionInput } from './dto/create-repository-version.input';
import { UpdateRepositoryVersionInput } from './dto/update-repository-version.input';
import { RemoveUserRepositoryOutput } from './remove-user-repository.output';

@Resolver(() => RepositoryVersion)
export class RepositoryVersionResolver {
  constructor(
    private readonly repositoryVersionService: RepositoryVersionService,
  ) {}

  @Mutation(() => RepositoryVersion)
  createRepositoryVersion(
    @Args('repositoryId', { type: () => Int }) repositoryId: number,
    @Args('createRepositoryVersionInput')
    createRepositoryVersionInput: CreateRepositoryVersionInput,
  ) {
    return this.repositoryVersionService.create(
      repositoryId,
      createRepositoryVersionInput,
    );
  }

  @Query(() => [RepositoryVersion], { name: 'repositoryVersion' })
  findAll() {
    return this.repositoryVersionService.findAll();
  }

  @Query(() => RepositoryVersion, { name: 'repositoryVersion' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.repositoryVersionService.findOne(id);
  }

  @Mutation(() => RepositoryVersion)
  updateRepositoryVersion(
    @Args('updateRepositoryVersionInput')
    updateRepositoryVersionInput: UpdateRepositoryVersionInput,
  ) {
    return this.repositoryVersionService.update(
      updateRepositoryVersionInput.id,
      updateRepositoryVersionInput,
    );
  }

  @Mutation(() => RemoveUserRepositoryOutput)
  async removeRepositoryVersion(
    @Args('repositoryId', { type: () => Int }) repositoryId: number,
  ) {
    const test = await this.repositoryVersionService.removeByRepositoryId(
      repositoryId,
    );

    return test;
  }
}
