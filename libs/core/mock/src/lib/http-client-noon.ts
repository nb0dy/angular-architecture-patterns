import { HttpBackend, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { HttpRequestEvent } from './http-request.event';

@Injectable()
export class HttpClientNoon implements HttpBackend {
  public handle(req: HttpRequest<any>): Observable<HttpEvent<HttpRequestEvent>> {
    return new Observable((observer: Observer<HttpEvent<any>>) => {
      observer.next(new HttpRequestEvent(req));
      observer.complete();

      return (): void => {};
    });
  }
}
