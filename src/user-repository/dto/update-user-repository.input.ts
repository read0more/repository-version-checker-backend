import { CreateUserRepositoryInput } from './create-user-repository.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserRepositoryInput extends PartialType(
  CreateUserRepositoryInput,
) {}
