import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CorrelationHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const correlationId = uuidv4();

    const modifiedReq = req.clone({
      setHeaders: {
        CorrelationId: correlationId
      }
    });

    return next.handle(modifiedReq);
  }


}
