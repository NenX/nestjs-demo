import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const logger = new Logger('Request');
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const h = context.switchToHttp()
    const req = h.getRequest<Request>()
    const res = h.getResponse<Response>()
    logger.log(`${req.method} ${req.originalUrl}`);

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => {
        const req = h.getRequest<Request>()
        const res = h.getResponse<Request>()
   
      }));
  }
}
