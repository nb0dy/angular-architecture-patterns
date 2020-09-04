import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { map, reduce, switchMap } from 'rxjs/operators';

import { EndpointFacadeService } from '@angular-architecture-patterns/core/endpoint';

import { MOCK_CONFIG, MOCK_DATA, IMockConfig } from './const.tokens';
import { IMockUrl } from './mock.models';

interface IHttpMockResponseSuccess {
  body: any;
  headers: HttpHeaders;
  statusText: string;
  status: number;
  url: string;
}

@Injectable()
export class HttpClientInterceptorMock implements HttpInterceptor {
  public constructor(
    @Inject(MOCK_CONFIG) private httpClientMockConfig: IMockConfig,
    @Inject(MOCK_DATA) private mockedData: IMockUrl[],
    private endpointService: EndpointFacadeService
  ) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, params } = request;

    if (!this.httpClientMockConfig.useMocks) {
      return next.handle(request);
    }

    return this.endpointService.getUrl(url, params).pipe(
      switchMap(requestUrl => this.getMockData(requestUrl, method)),
      switchMap(data => this.handleResponse(request, next, data))
    );
  }

  private handleResponse = (
    request: HttpRequest<any>,
    next: HttpHandler,
    data: IMockUrl
  ): Observable<HttpEvent<any>> => {
    if (!data) {
      return next.handle(request);
    }

    return this.createResponse(data, request.headers);
  };

  private createResponse = (
    data: IMockUrl,
    headers: HttpHeaders
  ): Observable<HttpEvent<IHttpMockResponseSuccess>> => {
    const responses = data ? data.responses || {} : {};
    const response: IHttpMockResponseSuccess = {
      body: responses.success || {},
      headers,
      statusText: !!responses ? 'Success' : 'Mock error',
      status: 200,
      url: data.url,
    };

    return of(new HttpResponse(response));
  };

  private getMockData = (url: string, method: string): Observable<IMockUrl> => {
    return from(this.mockedData).pipe(
      switchMap(data => {
        return this.endpointService.getUrl(data.url, this.getMockParams(data.params)).pipe(
          map(mockUrl => {
            return { ...data, url: mockUrl };
          })
        );
      }),
      reduce((acc, val) => [...acc, val], []),
      map((data: IMockUrl[]) => {
        return data.find(item => item.url === url && item.method === method);
      })
    );
  };

  private getMockParams = (params: HttpParams | { [key: string]: string }): HttpParams | null => {
    if (!params) {
      return null;
    }

    if (params instanceof HttpParams) {
      return params;
    }

    return new HttpParams({ fromObject: params });
  };
}
