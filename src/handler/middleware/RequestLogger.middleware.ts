import { NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {
    this.logger = new Logger(RequestLoggerMiddleware.name);
  }
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();

    res.on('finish', () => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      let statusCode = `[${res.statusCode}]`;
      if (res.statusCode >= 500) {
        statusCode = `\x1b[31m[${res.statusCode}]\x1b[0m`;
      } else if (res.statusCode >= 400 && res.statusCode < 500) {
        statusCode = `\x1b[33m[${res.statusCode}]\x1b[0m`;
      } else {
        statusCode = `\x1b[32m[${res.statusCode}]\x1b[0m`;
      }

      this.logger.log(
        `\x1b[32m[${req.method}]\x1b[0m  \x1b[35m${req.originalUrl}\x1b[0m ${statusCode} - \x1b[33m[${duration}ms]\x1b[0m`,
      );
    });

    next();
  }
}
