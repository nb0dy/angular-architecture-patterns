import { HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


import { IWindowRefService, WINDOW_REF_SERVICE } from './service.tokens';
import { getFullUrl, replaceParams } from './utils';

@Injectable()
export class EndpointService {
  private readonly baseDomain: string;

  public constructor(@Inject(WINDOW_REF_SERVICE) private windowRefService: IWindowRefService) {
    const windowRef = (this.windowRefService.nativeWindow || { location: { origin: '' }}) as Window;
    this.baseDomain = windowRef.location.origin;
  }

  public getUrl = (url: string, httpParams?: HttpParams): Observable<string> =>
    of(replaceParams(this.getFullUrl(url), httpParams));

  private getFullUrl = (url: string): string => getFullUrl(this.baseDomain, url);
}
