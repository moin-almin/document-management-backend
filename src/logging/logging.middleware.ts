import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP'); // Create a logger instance

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl, body } = req;
    const startTime = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const responseTime = Date.now() - startTime;

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} - ${responseTime}ms - Body: ${JSON.stringify(
          body,
        )}`,
      );
    });

    next();
  }
}
