import { Int, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RemoveUserRepositoryOutput {
  @Field(() => Int)
  count: number;
}
