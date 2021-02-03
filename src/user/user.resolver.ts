import { UnauthenticatedException } from '../auth/exceptions/unauthenticated.exception';
import { GqlAuthGuard } from './../auth/guards/gql-auth.guard';
import { CurrentUser } from './../auth/decorator/current-user.decorator';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards } from '@nestjs/common';
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOneById(id);
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  me(@CurrentUser() user: User) {
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
