import { HttpException, HttpStatus } from '@nestjs/common';
export class UnauthenticatedException extends HttpException {
  constructor() {
    super('unauthenticated', HttpStatus.UNAUTHORIZED);
  }
}
