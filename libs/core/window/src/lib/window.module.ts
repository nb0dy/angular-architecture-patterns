import { ModuleWithProviders, NgModule, Optional, PLATFORM_ID, SkipSelf } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { BrowserWindowRef } from './browser-window.service';
import { IWindowRefService, WindowRef } from './window-ref.service';

export function windowFactory(windowRef: IWindowRefService, platformId: object): Window | object {
  if (isPlatformBrowser(platformId)) {
    return windowRef;
  }

  return {};
}

@NgModule()
export class WindowModule {
  public static forRoot(): ModuleWithProviders<WindowModule> {
    return {
      ngModule: WindowModule,
      providers: [
        BrowserWindowRef,
        {
          provide: WindowRef,
          useFactory: windowFactory,
          deps: [BrowserWindowRef, PLATFORM_ID],
        }
      ],
    };
  }

  public constructor(
    @Optional()
    @SkipSelf()
    windowModule: WindowModule
  ) {
    if (windowModule) {
      throw new Error('WindowModule already instantiated');
    }
  }
}
