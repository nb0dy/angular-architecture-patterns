import { HttpEventType, HttpRequest, HttpUserEvent } from '@angular/common/http';

export class HttpRequestEvent implements HttpUserEvent<HttpRequest<any>> {
  public type: HttpEventType.User;
  public request: HttpRequest<any>;

  public constructor(req: HttpRequest<any>) {
    this.type = HttpEventType.User;
    this.request = req;
  }
}
