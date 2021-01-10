import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class RepositoryVersion {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
