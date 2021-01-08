import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host); // Nest 기본 예외처리에 위임. BaseExceptionFilter는 new를 사용해 인스턴스화 하면 안되고, 프레임워크가 알아서 만들게 해야함.
  }
}
