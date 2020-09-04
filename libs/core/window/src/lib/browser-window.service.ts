import { Injectable } from '@angular/core';

import { IWindowRefService } from './window-ref.service';

@Injectable()
export class BrowserWindowRef implements IWindowRefService {
  public get nativeWindow(): Window {
    return window;
  }
}
