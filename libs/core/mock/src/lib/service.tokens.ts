import { HttpParams } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface IEndpointFacadeService {
  getUrl(url: string, httpParams?: HttpParams): Observable<string>;
}

export const ENDPOINT_FACADE_SERVICE = new InjectionToken<IEndpointFacadeService>(
  'ENDPOINT_FACADE_SERVICE'
);
