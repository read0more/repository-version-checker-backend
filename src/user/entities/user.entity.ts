import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserRepository } from 'src/user-repository/entities/user-repository.entity';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  githubId: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  profileImage?: string;

  @Field(() => [UserRepository], { nullable: 'itemsAndList' })
  repositories?: UserRepository[];
}
