import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRepositoryVersionInput {
  @Field()
  version: string;

  @Field()
  url: string;

  @Field()
  publishedAt: Date;

  @Field()
  prerelease: boolean;
}
