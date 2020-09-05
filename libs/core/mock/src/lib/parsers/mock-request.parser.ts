import { HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpRequestEvent } from '../http-request.event';
import { IMockRequestHandler, IMockRequestParser } from '../mock.models';

@Injectable()
export class NoonRequestParser implements IMockRequestParser {
  public parse = (request: HttpRequest<any>, next: IMockRequestHandler): Observable<HttpEvent<HttpRequestEvent>> => {
    return next.handle(request);
  };
}
