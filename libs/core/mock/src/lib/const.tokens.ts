import { InjectionToken } from '@angular/core';

import { IMockRequestParser, IMockUrl } from './mock.models';

export interface IMockConfig {
  useMocks: boolean;
}

export const MOCK_CONFIG = new InjectionToken<IMockConfig>('MOCK_CONFIG');
export const MOCK_DATA = new InjectionToken<IMockUrl[]>('MOCK_DATA');
export const MOCK_REQUEST_PARSERS = new InjectionToken<IMockRequestParser[]>('MOCK_REQUEST_PARSERS');
