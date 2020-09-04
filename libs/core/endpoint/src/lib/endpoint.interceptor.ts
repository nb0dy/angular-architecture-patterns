import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { EndpointService } from './endpoint.service';
import { getParamsFromUrl } from './utils';

@Injectable()
export class EndpointInterceptor implements HttpInterceptor {
  public constructor(private endpointService: EndpointService) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const paramsFromUrl = getParamsFromUrl(request.url);

    return this.endpointService.getUrl(request.url, request.params).pipe(
      mergeMap(url => next.handle(this.createRequest(request, url, paramsFromUrl)))
    );
  }

  private createRequest = (request: HttpRequest<any>, url: string, paramsFromUrl: string[]): HttpRequest<any> => {
    let remainingParams = new HttpParams();

    const paramKeysToAdd = request.params.keys().filter(reqParam => !paramsFromUrl.includes(reqParam));
    paramKeysToAdd.forEach(param => {
      remainingParams = remainingParams.set(param, request.params.get(param));
    });

    return request.clone({ url, params: remainingParams });
  };
}
