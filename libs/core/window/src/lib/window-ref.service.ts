import { Injectable } from '@angular/core';

export interface IWindowRefService {
  nativeWindow: Window;
}

@Injectable()
export abstract class WindowRef implements IWindowRefService {
  public get nativeWindow(): Window {
    throw new Error('Not implemented.');
  }
}
