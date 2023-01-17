import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const now = Date.now();

    Logger.log(`${request.method} ${request.url}`, context.getClass().name);

    return next
      .handle()
      .pipe(
        tap(() =>
          Logger.log(
            `${request.method} ${request.url} ${Date.now() - now}ms`,
            context.getClass().name,
          ),
        ),
      );
  }
}
