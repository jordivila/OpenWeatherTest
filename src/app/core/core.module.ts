import { OpenWeatherService } from './services/open-weather/open-weather.service';
import { AppStoreService } from './../app.store';
import { ConfigService } from './services/config/config.service';
import { Config } from './services/config/env.config';
import { LayoutModule } from './components/layout/layout.module';
import { NgModule, ModuleWithProviders, Optional, SkipSelf, Injector, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Http, HttpModule, XHRBackend, ResponseOptions, BrowserXhr, XSRFStrategy } from '@angular/http';
import { LoadingModule } from './components/loading/loading.module';
import './operators';
import { throwIfAlreadyLoaded } from 'app/core/components/module-import-guard';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    NoopAnimationsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    HttpModule,
    LayoutModule,
    LoadingModule,
  ],

  declarations: [

  ],
  exports: [
    NoopAnimationsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    HttpModule,
    LayoutModule,
    LoadingModule,

  ],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ConfigService,
        OpenWeatherService
      ]
    };
  }

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

}
