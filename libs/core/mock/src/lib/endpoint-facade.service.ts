import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface IEndpointFacadeService {
  getUrl(url: string, httpParams?: HttpParams): Observable<string>;
}

@Injectable()
export class EndpointFacadeService implements IEndpointFacadeService {
  public getUrl = (url: string, httpParams?: HttpParams): Observable<string> => of(url);
}
