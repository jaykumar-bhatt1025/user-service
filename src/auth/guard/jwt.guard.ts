import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user): any {
    if (!user) {
      throw new UnauthorizedException(
        'Invalid Token. You are not authenticated to access this endpoint.',
      );
    }
    return user;
  }
}
