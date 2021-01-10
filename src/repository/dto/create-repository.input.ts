import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRepositoryInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
