import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AbstractType, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { EndpointFacadeService } from './endpoint-facade.service';
import { EndpointInterceptor } from './endpoint.interceptor';
import { EndpointService } from './endpoint.service';
import { BrowserWindowRef, IWindowRefService } from './browser-window.service';

@NgModule()
export class EndpointModule {
  public static forRoot(windowRef?: AbstractType<IWindowRefService>): ModuleWithProviders<EndpointModule> {
    return {
      ngModule: EndpointModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: EndpointInterceptor, multi: true },
        windowRef ? { provide: BrowserWindowRef, useExisting: windowRef } : BrowserWindowRef,
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
