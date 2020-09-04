import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { WindowRef } from '@angular-architecture-patterns/core/window';

import { getFullUrl, replaceParams } from './utils';

@Injectable()
export class EndpointService {
  private readonly baseDomain: string;

  public constructor(private windowRefService: WindowRef,) {
    const windowRef = (this.windowRefService.nativeWindow || { location: { origin: '' }}) as Window;
    this.baseDomain = windowRef.location.origin;
  }

  public getUrl = (url: string, httpParams?: HttpParams): Observable<string> =>
    of(replaceParams(this.getFullUrl(url), httpParams));

  private getFullUrl = (url: string): string => getFullUrl(this.baseDomain, url);
}
