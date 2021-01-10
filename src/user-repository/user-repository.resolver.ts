import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserRepositoryService } from './user-repository.service';
import { UserRepository } from './entities/user-repository.entity';
import { CreateUserRepositoryInput } from './dto/create-user-repository.input';
import { UpdateUserRepositoryInput } from './dto/update-user-repository.input';

@Resolver(() => UserRepository)
export class UserRepositoryResolver {
  constructor(private readonly userRepositoryService: UserRepositoryService) {}

  @Mutation(() => UserRepository)
  createUserRepository(@Args('createUserRepositoryInput') createUserRepositoryInput: CreateUserRepositoryInput) {
    return this.userRepositoryService.create(createUserRepositoryInput);
  }

  @Query(() => [UserRepository], { name: 'userRepository' })
  findAll() {
    return this.userRepositoryService.findAll();
  }

  @Query(() => UserRepository, { name: 'userRepository' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userRepositoryService.findOne(id);
  }

  @Mutation(() => UserRepository)
  updateUserRepository(@Args('updateUserRepositoryInput') updateUserRepositoryInput: UpdateUserRepositoryInput) {
    return this.userRepositoryService.update(updateUserRepositoryInput.id, updateUserRepositoryInput);
  }

  @Mutation(() => UserRepository)
  removeUserRepository(@Args('id', { type: () => Int }) id: number) {
    return this.userRepositoryService.remove(id);
  }
}
