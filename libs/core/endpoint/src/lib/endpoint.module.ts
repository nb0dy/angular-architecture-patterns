import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { EndpointFacadeService } from './endpoint-facade.service';
import { EndpointInterceptor } from './endpoint.interceptor';
import { EndpointService } from './endpoint.service';

@NgModule()
export class EndpointModule {
  public static forRoot(): ModuleWithProviders<EndpointModule> {
    return {
      ngModule: EndpointModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: EndpointInterceptor, multi: true },
        EndpointFacadeService,
        EndpointService,
      ]
    };
  }

  public constructor(
    @Optional()
    @SkipSelf()
    endpointModule: EndpointModule
  ) {
    if (endpointModule) {
      throw new Error('EndpointModule already instantiated');
    }
  }
}
