import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserRepositoryInput {
  @Field()
  repositoryUrl: string;
}
