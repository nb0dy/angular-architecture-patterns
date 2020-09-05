import { HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpRequestEvent } from './http-request.event';

export enum METHOD_TYPE {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface IMockUrl {
  url: string;
  method: METHOD_TYPE;
  params?: HttpParams | { [key: string]: string };
  responses: {
    success?: any;
    error?: any;
  };
}

export interface IMockRequestHandler {
  handle(request: HttpRequest<any>): Observable<HttpEvent<HttpRequestEvent>>;
}

export interface IMockRequestParser {
  parse(request: HttpRequest<any>, next: IMockRequestHandler): Observable<HttpEvent<HttpRequestEvent>>;
}
