import { Repository } from './../../repository/entities/repository.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserRepository {
  @Field(() => Repository)
  repository?: Repository;

  @Field()
  repositoryUrl: string;
}
