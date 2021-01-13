import { GqlAuthGuard } from './../auth/guards/gql-auth.guard';
import { CurrentUser } from './../auth/decorator/current-user.decorator';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id') id: number) {
    return this.userService.findOneById(id);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  removeUser(
    @Args('githubId') githubId: string,
    @CurrentUser() user: CreateUserInput,
  ) {
    if (user.githubId !== githubId) {
      throw UnauthorizedException;
    }

    return this.userService.remove(githubId);
  }
}
