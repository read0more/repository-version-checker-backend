import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserRepositoryInput } from './dto/create-user-repository.input';

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

  findOne(id: number) {
    return this.prismaService.userRepository.findUnique({
      where: {
        id,
      },
    });
  }

  findOneByRepositoryIdAndUserId(userId: number, repositoryId: number) {
    return this.prismaService.userRepository.findUnique({
      where: {
        userId_repositoryId: {
          userId,
          repositoryId,
        },
      },
    });
  }

  remove(id) {
    return this.prismaService.userRepository.delete({
      where: {
        id,
      },
    });
  }
}
