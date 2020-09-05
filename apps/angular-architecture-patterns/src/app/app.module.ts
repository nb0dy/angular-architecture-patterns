import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { WindowModule, WindowRef } from '@angular-architecture-patterns/core/window';
import { EndpointFacadeService, EndpointModule } from '@angular-architecture-patterns/core/endpoint';
import { MockModule } from '@angular-architecture-patterns/core/mock';

import { AppComponent } from './app.component';
import { data as navigationMockData } from './navigation.mock';

const mockConfig = {
  useMocks: true,
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    WindowModule.forRoot(),
    EndpointModule.forRoot(WindowRef),
    MockModule.forRoot(mockConfig, navigationMockData, EndpointFacadeService),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
