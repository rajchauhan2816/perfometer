import { Observable, catchError } from 'rxjs';
import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  SubjectCodeAlreadyExistsError,
  UsernameAlreadyExistsError,
} from '../errors';

// All not found errors in array
const badRequestErrors = [
  SubjectCodeAlreadyExistsError,
  UsernameAlreadyExistsError,
];

@Injectable()
export class BadRequestInterceptor implements NestInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    // next.handle() is an Observable of the controller's result value
    return next.handle().pipe(
      catchError((error) => {
        if (badRequestErrors.some((e) => error instanceof e)) {
          throw new BadRequestException(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}
