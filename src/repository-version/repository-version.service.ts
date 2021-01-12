import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateRepositoryVersionInput } from './dto/create-repository-version.input';
import { UpdateRepositoryVersionInput } from './dto/update-repository-version.input';

@Injectable()
export class RepositoryVersionService {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    repositoryId: number,
    createRepositoryVersionInput: CreateRepositoryVersionInput,
  ) {
    return this.prismaService.repositoryVersion.create({
      data: {
        prerelease: createRepositoryVersionInput.prerelease,
        publishedAt: createRepositoryVersionInput.publishedAt,
        url: createRepositoryVersionInput.url,
        repository: {
          connect: {
            id: repositoryId,
          },
        },
      },
    });
  }

  findAll() {
    return `This action returns all repositoryVersion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} repositoryVersion`;
  }

  update(
    id: number,
    updateRepositoryVersionInput: UpdateRepositoryVersionInput,
  ) {
    return `This action updates a #${id} repositoryVersion`;
  }

  removeByRepositoryId(repositoryId: number) {
    return this.prismaService.repositoryVersion.deleteMany({
      where: {
        repositoryId,
      },
    });
  }
}
