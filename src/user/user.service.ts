import { User } from './entities/user.entity';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserInput: CreateUserInput): Promise<User> {
    return this.prismaService.user.create({
      data: createUserInput,
    });
  }

  findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  findOne(githubId: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: {
        githubId,
      },
    });
  }

  remove(id: number): Promise<User> {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
