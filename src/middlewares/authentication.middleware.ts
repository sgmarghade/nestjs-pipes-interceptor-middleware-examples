import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { RequestService } from '../request.service';

//This middlewares should be registered in AppModule for given routes.
@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthenticationMiddleware.name);
  constructor(private readonly requestService: RequestService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const userId = Math.random().toString();
    this.logger.log('Setting userId ' + userId);
    this.requestService.setUserId(userId);
    next();
  }
}
