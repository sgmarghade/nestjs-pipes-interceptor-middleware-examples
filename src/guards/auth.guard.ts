import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RequestService } from '../request.service';

//Guards must return true/false.
//Implements canActivate
//We can inject any service / provider.
@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private readonly requestService: RequestService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    this.logger.log('Inside auth guard ', request);
    this.logger.log(
      'Accessing userId in AuthGuard ' + this.requestService.getUserId(),
    );
    return true;
  }
}
