/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export class TransformResponse implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((response) => {
        if (
          response &&
          typeof response === 'object' &&
          'data' in response &&
          'message' in response
        ) {
          return {
            success: true,
            statusCode: context.switchToHttp().getResponse().statusCode,
            timestamp: new Date().toISOString(),
            path: context.switchToHttp().getRequest().url,
            message: response.message,
            data: response.data,
          };
        }
        return {
          success: true,
          statusCode: context.switchToHttp().getResponse().statusCode,
          timestamp: new Date().toISOString(),
          path: context.switchToHttp().getRequest().url,
          data: response,
        };
      }),
    );
  }
}
