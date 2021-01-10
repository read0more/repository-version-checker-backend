import { Injectable } from '@nestjs/common';
import { CreateRepositoryInput } from './dto/create-repository.input';
import { UpdateRepositoryInput } from './dto/update-repository.input';

@Injectable()
export class RepositoryService {
  create(createRepositoryInput: CreateRepositoryInput) {
    return 'This action adds a new repository';
  }

  findAll() {
    return `This action returns all repository`;
  }

  findOne(id: number) {
    return `This action returns a #${id} repository`;
  }

  update(id: number, updateRepositoryInput: UpdateRepositoryInput) {
    return `This action updates a #${id} repository`;
  }

  remove(id: number) {
    return `This action removes a #${id} repository`;
  }
}
