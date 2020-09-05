import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { concatMap, map, reduce, switchMap } from 'rxjs/operators';

import { IMockConfig, MOCK_CONFIG, MOCK_DATA, MOCK_REQUEST_PARSERS } from './const.tokens';
import { HttpInterceptorHandler } from './handlers/http-interceptor.handler';
import { MockRequestHandler } from './handlers/mock-request.handler';
import { HttpClientNoon } from './http-client-noon';
import { HttpRequestEvent } from './http-request.event';
import {
  IMockRequestHandler,
  IMockRequestParser,
  IMockUrl,
} from './mock.models';

interface IHttpMockResponseSuccess {
  body: any;
  headers: HttpHeaders;
  statusText: string;
  status: number;
  url: string;
}

@Injectable()
export class HttpClientInterceptorMock implements HttpInterceptor {
  private interceptorHandler: HttpHandler | null = null;
  private requestHandler: IMockRequestHandler | null = null;

  public constructor(
    private injector: Injector,
    private httpClientNoon: HttpClientNoon,
    @Inject(MOCK_CONFIG) private httpClientMockConfig: IMockConfig,
    @Inject(MOCK_DATA) private mockedData: IMockUrl[],
    @Inject(MOCK_REQUEST_PARSERS) private mockRequestParsers: IMockRequestParser[]
  ) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.httpClientMockConfig.useMocks) {
      return next.handle(request);
    }

    this.setHandlers();

    return this.createRequest(request.method, request.url, request.params).pipe(
      switchMap((req): Observable<IMockUrl> => this.getMockData(req.url, req.method)),
      switchMap((data): Observable<HttpEvent<any>> => this.handleResponse(request, next, data))
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

    return this.createSuccessResponse(data, request.headers);
  };

  private createSuccessResponse = (
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
      switchMap(
        (data): Observable<IMockUrl> =>
          this.createRequest(method, data.url, this.getMockParams(data.params)).pipe(
            map((req): IMockUrl => ({ ...data, url: req.url, params: req.params }))
          )
      ),
      reduce((acc, val): IMockUrl[] => [...acc, val], []),
      map((data: IMockUrl[]): IMockUrl | null => {
        return data.find(
          (item): boolean => item.url === url && item.method === method
        );
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

  private createRequest = (method: string, url: string, params: HttpParams): Observable<HttpRequest<any>> => {
    const request = new HttpRequest(method, url, { params });

    return of(request).pipe(
      concatMap((req): Observable<HttpEvent<HttpRequestEvent>> => this.requestHandler.handle(req)),
      map((response: HttpRequestEvent): HttpRequest<any> => this.getRequestFromEvent(response, request)),
      concatMap((req): Observable<HttpEvent<any>> => this.interceptorHandler.handle(req)),
      map((response: HttpRequestEvent): HttpRequest<any> => this.getRequestFromEvent(response, request))
    );
  };

  private getRequestFromEvent = (response: HttpRequestEvent, request: HttpRequest<any>): HttpRequest<any> => {
    if (response.type === HttpEventType.User && response.request) {
      return response.request;
    }

    return request;
  };

  private setHandlers = (): void => {
    if (this.interceptorHandler === null) {
      const interceptors = this.injector.get(HTTP_INTERCEPTORS, []);
      this.interceptorHandler = interceptors
        .filter((interceptor): boolean => interceptor !== this)
        .reduceRight(
          (next, interceptor): HttpInterceptorHandler => new HttpInterceptorHandler(next, interceptor),
          this.httpClientNoon
        );
    }

    if (this.requestHandler === null) {
      const requestParsers = this.mockRequestParsers || [];
      this.requestHandler = requestParsers.reduceRight(
        (next, parser): IMockRequestHandler => new MockRequestHandler(next, parser),
        this.httpClientNoon
      );
    }
  };
}
