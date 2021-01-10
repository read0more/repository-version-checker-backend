import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  githubId: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  profileImage?: string;
}
