import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { WindowRef } from '@angular-architecture-patterns/core/window';
import { EndpointFacadeService } from '@angular-architecture-patterns/core/endpoint';
import { endpoints } from '../endpoints';

const notificationItemParams = new HttpParams({ fromObject: { notificationId: '123' } });

@Component({
  selector: 'angular-architecture-patterns-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-architecture-patterns';
  endpointUrl = '';
  notificationItem = null;
  origin = '';

  constructor(
    private httpClient: HttpClient,
    private windowRef: WindowRef,
    private endpointFacadeService: EndpointFacadeService
  ) {
    this.origin = this.windowRef.nativeWindow.location.origin;
  }

  ngOnInit() {
    this.endpointFacadeService
      .getUrl(endpoints.api.notification.item.url, notificationItemParams)
      .subscribe(url => (this.endpointUrl = url));

    this.httpClient
      .get(endpoints.api.notification.item.url, { params: notificationItemParams})
      .subscribe(response => (this.notificationItem = response))
  }
}
