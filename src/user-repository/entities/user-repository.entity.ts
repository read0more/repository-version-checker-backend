import { Repository } from './../../repository/entities/repository.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserRepository {
  @Field(() => ID)
  id: number;

  @Field(() => Repository)
  repository?: Repository;

  @Field()
  repositoryUrl: string;
}
