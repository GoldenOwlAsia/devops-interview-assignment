import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApp(): any {
    return { status: 'ok' };
  }
}
