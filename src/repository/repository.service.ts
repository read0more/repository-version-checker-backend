import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateRepositoryInput } from './dto/create-repository.input';
import { UpdateRepositoryInput } from './dto/update-repository.input';

@Injectable()
export class RepositoryService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createRepositoryInput: CreateRepositoryInput) {
    return this.prismaService.repository.create({
      data: createRepositoryInput,
    });
  }

  findAll() {
    return this.prismaService.repository.findMany();
  }

  findOne(id: number) {
    return this.prismaService.repository.findUnique({
      where: {
        id,
      },
    });
  }

  findOneByName(name: string) {
    return this.prismaService.repository.findUnique({
      where: {
        name,
      },
    });
  }

  update(id: number, updateRepositoryInput: UpdateRepositoryInput) {
    return this.prismaService.repository.update({
      where: {
        id,
      },
      data: updateRepositoryInput,
    });
  }

  remove(id: number) {
    return this.prismaService.repository.delete({
      where: {
        id,
      },
    });
  }
}
