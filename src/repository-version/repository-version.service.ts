import { Injectable } from '@nestjs/common';
import { CreateRepositoryVersionInput } from './dto/create-repository-version.input';
import { UpdateRepositoryVersionInput } from './dto/update-repository-version.input';

@Injectable()
export class RepositoryVersionService {
  create(createRepositoryVersionInput: CreateRepositoryVersionInput) {
    return 'This action adds a new repositoryVersion';
  }

  findAll() {
    return `This action returns all repositoryVersion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} repositoryVersion`;
  }

  update(id: number, updateRepositoryVersionInput: UpdateRepositoryVersionInput) {
    return `This action updates a #${id} repositoryVersion`;
  }

  remove(id: number) {
    return `This action removes a #${id} repositoryVersion`;
  }
}
