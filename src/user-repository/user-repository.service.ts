import { UserRepository } from './entities/user-repository.entity';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserRepositoryInput } from './dto/create-user-repository.input';
import { UpdateUserRepositoryInput } from './dto/update-user-repository.input';

@Injectable()
export class UserRepositoryService {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    createUserRepositoryInput: CreateUserRepositoryInput,
    userId: number,
    repositoryId: number,
  ) {
    return this.prismaService.userRepository.create({
      data: {
        ...createUserRepositoryInput,
        user: {
          connect: {
            id: userId,
          },
        },
        repository: {
          connect: {
            id: repositoryId,
          },
        },
      },
      include: {
        repository: {
          include: {
            versions: true,
          },
        },
      },
    });
  }

  findOne(userId: number, repositoryId: number) {
    return this.prismaService.userRepository.findUnique({
      where: {
        userId_repositoryId: {
          userId,
          repositoryId,
        },
      },
    });
  }

  remove(userId: number, repositoryId: number) {
    return this.prismaService.userRepository.delete({
      where: {
        userId_repositoryId: {
          userId,
          repositoryId,
        },
      },
    });
  }
}
