import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AbstractType, Inject, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { MOCK_CONFIG, MOCK_DATA, IMockConfig, } from './const.tokens';
import { HttpClientInterceptorMock } from './mock.interceptor';
import { IMockUrl } from './mock.models';
import { ENDPOINT_FACADE_SERVICE, IEndpointFacadeService } from './service.tokens';

const defaultConfig: IMockConfig = {
  useMocks: false,
};

@NgModule()
export class MockFeatureModule {
  public constructor(@Inject(MOCK_DATA) protected mockData: IMockUrl[]) {}
}

@NgModule()
export class MockModule {
  public static forRoot(
    mockConfig: IMockConfig,
    data: IMockUrl[] = [],
    endpointFacadeService: AbstractType<IEndpointFacadeService>
  ): ModuleWithProviders<MockModule> {
    return {
      ngModule: MockModule,
      providers: [
        { provide: MOCK_CONFIG, useValue: { ...defaultConfig, ...(mockConfig || {}) } },
        { provide: MOCK_DATA, useValue: data },
        { provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptorMock, multi: true },
        { provide: ENDPOINT_FACADE_SERVICE, useExisting: endpointFacadeService },
      ],
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
