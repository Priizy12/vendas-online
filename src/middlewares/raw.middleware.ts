import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as rawBody from 'raw-body';

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.is('application/json')) {
     const raw = await rawBody(req);
    }
    next();
  }
}
