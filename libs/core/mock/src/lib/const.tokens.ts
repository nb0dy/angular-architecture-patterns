import { InjectionToken } from '@angular/core';

import { IMockUrl } from './mock.models';

export interface IMockConfig {
  useMocks: boolean;
}

export const MOCK_CONFIG = new InjectionToken<IMockConfig>('MOCK_CONFIG');
export const MOCK_DATA = new InjectionToken<IMockUrl[]>('MOCK_DATA');
