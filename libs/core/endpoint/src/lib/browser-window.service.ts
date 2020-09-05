import { Injectable } from '@angular/core';

export interface IWindowRefService {
  nativeWindow: Window;
}

@Injectable()
export class BrowserWindowRef implements IWindowRefService {
  public get nativeWindow(): Window {
    return window;
  }
}
