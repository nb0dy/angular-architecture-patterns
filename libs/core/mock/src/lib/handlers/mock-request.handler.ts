import { HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpRequestEvent } from '../http-request.event';
import { IMockRequestHandler, IMockRequestParser } from '../mock.models';

export class MockRequestHandler implements IMockRequestHandler {
  public constructor(private next: IMockRequestHandler, private mockRequestParser: IMockRequestParser) {}

  public handle = (request: HttpRequest<any>): Observable<HttpEvent<HttpRequestEvent>> => {
    return this.mockRequestParser.parse(request, this.next);
  };
}
