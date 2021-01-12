import { UserRepository } from './../../user-repository/entities/user-repository.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';

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

  @Field(() => [UserRepository], { nullable: 'items' })
  repositories?: UserRepository[];
}
