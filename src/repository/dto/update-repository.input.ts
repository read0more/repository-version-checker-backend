import { CreateRepositoryInput } from './create-repository.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRepositoryInput extends PartialType(CreateRepositoryInput) {
  @Field()
  updatedAt: Date;
}
