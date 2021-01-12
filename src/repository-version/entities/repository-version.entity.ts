import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class RepositoryVersion {
  @Field(() => ID)
  id: number;

  @Field()
  prerelease: boolean;

  @Field()
  url: string;

  @Field()
  publishedAt: Date;
}
