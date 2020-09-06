import { HttpEvent, HttpEventType, HttpRequest, HttpUserEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { EndpointFacadeService } from '@angular-architecture-patterns/core/endpoint';

export interface IHttpRequestEvent extends HttpUserEvent<HttpRequest<any>> {
  type: HttpEventType.User;
  request: HttpRequest<any>;
}

export interface IMockRequestHandler {
  handle(request: HttpRequest<any>): Observable<HttpEvent<IHttpRequestEvent>>;
}

export interface IMockRequestParser {
  parse(request: HttpRequest<any>, next: IMockRequestHandler): Observable<HttpEvent<IHttpRequestEvent>>;
}

@Injectable()
export class EndpointMockParser implements IMockRequestParser {
  public constructor(private endpointFacadeService: EndpointFacadeService) {}
  public parse = (request: HttpRequest<any>, next: IMockRequestHandler): Observable<HttpEvent<IHttpRequestEvent>> => {
    return this.endpointFacadeService.getUrl(request.url, request.params)
      .pipe(
        map((url: string): HttpRequest<any> => request.clone({ url })),
        switchMap((req: HttpRequest<any>): Observable<HttpEvent<IHttpRequestEvent>> => next.handle(req))
      );
  };
}
