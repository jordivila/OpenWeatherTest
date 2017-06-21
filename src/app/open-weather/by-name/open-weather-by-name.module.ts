import { ToggleButtonModule } from './../../core/components/toggle-button/toggle-button.module';
import { AppStoreService } from './../../app.store';
import { OpenWeatherReducersService } from './open-weather-by-name.redux.reducers';
import { OpenWeatherService } from './../../core/services/open-weather/open-weather.service';
import { LoadingService } from './../../core/components/loading/loading.service';
import { OpenWeatherActions } from './open-weather-by-name.redux.actions';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenWeatherByNameRoutingModule } from './open-weather-by-name.routing';
import { OpenWeatherByNameComponent } from './open-weather-by-name.component';
import { OpenWeatherHistoryComponent } from './open-weather-history/open-weather-history.component';
import { OpenWeatherCurrentComponent } from './open-weather-current/open-weather-current.component';
import { OpenWeatherItemComponent } from './open-weather-item/open-weather-item.component';

export function OpenWeatherActionsFactory(loadingService: LoadingService, openWeatherService: OpenWeatherService) {
  return new OpenWeatherActions(loadingService, openWeatherService);
}

@NgModule({
  imports: [
    CommonModule,
    OpenWeatherByNameRoutingModule,
    ToggleButtonModule
  ],
  declarations: [OpenWeatherByNameComponent, OpenWeatherHistoryComponent, OpenWeatherCurrentComponent, OpenWeatherItemComponent],
  exports: [OpenWeatherByNameComponent],
  providers: [
    OpenWeatherReducersService,
    {
      provide: OpenWeatherActions,
      useFactory: OpenWeatherActionsFactory,
      deps: [LoadingService, OpenWeatherService]
    }]
})
export class OpenWeatherByNameModule {
  constructor(appStore: AppStoreService) {
    appStore.addReducers({ OpenWeatherStore: OpenWeatherReducersService.Reducers });
  }
}
