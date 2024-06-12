import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

enum MorganLevels {
  combined = 'combined',
  dev = 'dev',
  tiny = 'tiny',
}

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(HttpLoggerMiddleware.name);
  use(req: Request, res: Response, next: NextFunction): void {
    morgan(MorganLevels.dev, {
      stream: {
        write: (msg: string) => this.logger.debug(msg),
      },
    })(req, res, next);
  }
}
