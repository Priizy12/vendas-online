import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

export class RawBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    req.setEncoding('utf8');
    req.rawBody = '';
    req.on('data', function(chunk) {
      req.rawBody += chunk;
    });
    req.on('end', function() {
      next();
    });
  }
}
