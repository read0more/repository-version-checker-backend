import { Injectable } from '@nestjs/common';
import { CreateUserRepositoryInput } from './dto/create-user-repository.input';
import { UpdateUserRepositoryInput } from './dto/update-user-repository.input';

@Injectable()
export class UserRepositoryService {
  create(createUserRepositoryInput: CreateUserRepositoryInput) {
    return 'This action adds a new userRepository';
  }

  findAll() {
    return `This action returns all userRepository`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userRepository`;
  }

  update(id: number, updateUserRepositoryInput: UpdateUserRepositoryInput) {
    return `This action updates a #${id} userRepository`;
  }

  remove(id: number) {
    return `This action removes a #${id} userRepository`;
  }
}
