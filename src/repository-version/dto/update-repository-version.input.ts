import { CreateRepositoryVersionInput } from './create-repository-version.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRepositoryVersionInput extends PartialType(CreateRepositoryVersionInput) {
  @Field(() => Int)
  id: number;
}
