import { InjectionToken } from '@angular/core';

export interface IWindowRefService {
  nativeWindow: Window | object;
}

export const WINDOW_REF_SERVICE = new InjectionToken<IWindowRefService>('WINDOW_REF_SERVICE');
