import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserRepositoryInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
