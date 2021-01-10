import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RepositoryService } from './repository.service';
import { Repository } from './entities/repository.entity';
import { CreateRepositoryInput } from './dto/create-repository.input';
import { UpdateRepositoryInput } from './dto/update-repository.input';

@Resolver(() => Repository)
export class RepositoryResolver {
  constructor(private readonly repositoryService: RepositoryService) {}

  @Mutation(() => Repository)
  createRepository(@Args('createRepositoryInput') createRepositoryInput: CreateRepositoryInput) {
    return this.repositoryService.create(createRepositoryInput);
  }

  @Query(() => [Repository], { name: 'repository' })
  findAll() {
    return this.repositoryService.findAll();
  }

  @Query(() => Repository, { name: 'repository' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.repositoryService.findOne(id);
  }

  @Mutation(() => Repository)
  updateRepository(@Args('updateRepositoryInput') updateRepositoryInput: UpdateRepositoryInput) {
    return this.repositoryService.update(updateRepositoryInput.id, updateRepositoryInput);
  }

  @Mutation(() => Repository)
  removeRepository(@Args('id', { type: () => Int }) id: number) {
    return this.repositoryService.remove(id);
  }
}
