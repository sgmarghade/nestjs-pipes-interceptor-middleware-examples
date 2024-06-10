import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  Scope,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable({ scope: Scope.REQUEST })
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    //This is before calling controller / handle;
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const userAgent = request.get('user-agent') || '';
    const { ip, method, path } = request;
    this.logger.log(
      `${method} - ${path} - ${ip} - ${userAgent} - ${context.getClass().name} - ${context.getHandler().name}`,
    );
    this.logger.log('Sending from Logger intereceptor to controller');
    //Hanlde() method call will call the controller and and you can pipe response and intecept it too.
    return next.handle().pipe(
      tap((data: any) => {
        this.logger.log('Back from controller');
        const response = context.switchToHttp().getResponse();
        const { statusCode } = response;
        this.logger.log(`Response status is ${statusCode}`);
        this.logger.debug('Data is : ', data);
        this.logger.log(`Total time taken ${Date.now() - now} ms`);
      }),
    );
  }
}
