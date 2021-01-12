import { HttpException, HttpStatus } from '@nestjs/common';

export class RepositoryUrlException extends HttpException {
  constructor() {
    super(
      '입력한 URL이 github의 repository URL이 맞는지 확인해 주세요.',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
