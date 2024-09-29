import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Event } from 'src/entities/event.entity';

@Injectable()
export class EventListInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const baseUrl = req.protocol + '://' + req.headers.host + '/';
    return next.handle().pipe(
      map((events: Event[]) => {
        return {
          events: events.map((e) => {
            e.image = e.image && baseUrl + e.image;
            return e;
          }),
        };
      })
    );
  }
}
