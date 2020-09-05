import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AbstractType, Inject, ModuleWithProviders, NgModule, Optional, Provider, SkipSelf } from '@angular/core';

import { MOCK_CONFIG, MOCK_DATA, IMockConfig, MOCK_REQUEST_PARSERS } from './const.tokens';
import { HttpClientInterceptorMock } from './mock.interceptor';
import { IMockRequestParser, IMockUrl } from './mock.models';
import { HttpClientNoon } from './http-client-noon';
import { NoonRequestParser } from './parsers/mock-request.parser';

const defaultConfig: IMockConfig = {
  useMocks: false,
};

export function getProviders(
  mockConfig: IMockConfig,
  data: IMockUrl[] = [],
  requestParsers: AbstractType<IMockRequestParser>[]
): Provider[] {
  const providers: Provider[] = [
    HttpClientNoon,
    { provide: MOCK_CONFIG, useValue: { ...defaultConfig, ...(mockConfig || {}) } },
    { provide: MOCK_DATA, useValue: data },
    { provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptorMock, multi: true },
    { provide: MOCK_REQUEST_PARSERS, useClass: NoonRequestParser, multi: true },
  ];

  if (requestParsers && requestParsers.length) {
    requestParsers.forEach((parser): void => {
      providers.push({ provide: MOCK_REQUEST_PARSERS, useExisting: parser, multi: true });
    });
  }

  return providers;
}

@NgModule()
export class MockFeatureModule {
  public constructor(@Inject(MOCK_DATA) protected mockData: IMockUrl[]) {}
}

@NgModule()
export class MockModule {
  public static forRoot(
    mockConfig: IMockConfig,
    data: IMockUrl[] = [],
    requestParsers: AbstractType<IMockRequestParser>[] = []
  ): ModuleWithProviders<MockModule> {
    return {
      ngModule: MockModule,
      providers: getProviders(mockConfig, data, requestParsers),
    };
  }

  public constructor(
    @Optional()
    @SkipSelf()
    httpClientMockModule: MockModule
  ) {
    if (httpClientMockModule) {
      throw new Error('MockModule already instantiated');
    }
  }
}
