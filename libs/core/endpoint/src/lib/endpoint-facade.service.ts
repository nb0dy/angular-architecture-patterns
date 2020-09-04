import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { EndpointService } from './endpoint.service';

@Injectable()
export class EndpointFacadeService {
  public constructor(private endpointService: EndpointService) {}

  public getUrl = (url: string, httpParams?: HttpParams): Observable<string> =>
    this.endpointService.getUrl(url, httpParams);
}
