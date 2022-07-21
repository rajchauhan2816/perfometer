import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedUser } from './auth.interfaces';

export const CurrentUser = createParamDecorator<AuthenticatedUser>(
  (_: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user as AuthenticatedUser;
  },
);
