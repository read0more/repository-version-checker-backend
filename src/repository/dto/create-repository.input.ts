import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRepositoryInput {
  @Field()
  name: string;
}
