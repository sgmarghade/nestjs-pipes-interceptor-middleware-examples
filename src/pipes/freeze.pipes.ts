import { Injectable, Logger, PipeTransform } from '@nestjs/common';

@Injectable()
export class FreezePipes implements PipeTransform {
  private readonly logger = new Logger(FreezePipes.name);

  transform(value: any) {
    this.logger.log('Freezing values passed to pipe ');
    Object.freeze(value);
    return value;
  }
}
