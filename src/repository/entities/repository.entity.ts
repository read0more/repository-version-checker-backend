import { RepositoryVersion } from './../../repository-version/entities/repository-version.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Repository {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  updatedAt: Date;

  @Field(() => [RepositoryVersion], { nullable: 'items' })
  versions?: RepositoryVersion[];
}
