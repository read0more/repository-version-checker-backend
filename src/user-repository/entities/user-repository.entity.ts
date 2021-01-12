import { Repository } from './../../repository/entities/repository.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserRepository {
  @Field(() => Repository)
  repository?: Repository;

  @Field(() => Int)
  order: number;

  @Field()
  repositoryUrl: string;
}
