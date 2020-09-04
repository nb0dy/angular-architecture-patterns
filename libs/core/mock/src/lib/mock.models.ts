import { HttpParams } from '@angular/common/http';

export enum METHOD_TYPE {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface IMockUrl {
  url: string;
  method: METHOD_TYPE;
  params?: HttpParams | { [key: string]: string };
  responses: {
    success?: any;
    error?: any;
  };
}
