import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestUser } from 'src/shared/types';
import { Request } from 'express';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.user as RequestUser;
  },
);
