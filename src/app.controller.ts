import {
  Post,
  Body,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { FreezePipes } from './pipes/freeze.pipes';

@Controller()
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //If we modify any element of body will throw error.
  @Post()
  returnPostValue(@Body(new FreezePipes()) body: any) {
    //body.y = 1; This will throw error due to Freeze pipe
    return body;
  }
}
