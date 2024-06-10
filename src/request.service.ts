import { Injectable, Scope } from '@nestjs/common';

//new instance for each request
@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  private userId: string;

  setUserId(userId: string) {
    this.userId = userId;
  }

  getUserId(): string {
    return this.userId;
  }
}
