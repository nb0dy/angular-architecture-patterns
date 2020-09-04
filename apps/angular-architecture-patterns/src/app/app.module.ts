import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { WindowModule } from '@angular-architecture-patterns/core/window';
import { EndpointModule } from '@angular-architecture-patterns/core/endpoint';
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
    EndpointModule.forRoot(),
    MockModule.forRoot(mockConfig, navigationMockData),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
