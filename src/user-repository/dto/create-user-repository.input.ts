import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserRepositoryInput {
  @Field()
  repositoryUrl: string;

  @Field(() => Int)
  order: number;
}
