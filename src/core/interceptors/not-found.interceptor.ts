import { SubjectNotFoundError, UsernameNotFoundError } from './../errors';
import { Observable, catchError } from 'rxjs';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';

// All not found errors in array
const notFoundErrors = [SubjectNotFoundError, UsernameNotFoundError];

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    // next.handle() is an Observable of the controller's result value
    return next.handle().pipe(
      catchError((error) => {
        if (notFoundErrors.some((e) => error instanceof e)) {
          throw new NotFoundException(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}
