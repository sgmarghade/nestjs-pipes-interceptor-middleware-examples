import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

//Register it in app module to be available
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    this.logger.log('Caught exception in filter and modifying response');
    const response = host.switchToHttp().getResponse();
    const request = host.switchToHttp().getRequest();
    const status = exception.getStatus();
    response.status(status).json({
      status: status,
      timestamp: new Date().toISOString(),
      path: request.path,
      message: exception.message,
    });
  }
}
