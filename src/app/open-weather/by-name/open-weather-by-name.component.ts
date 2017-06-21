import { IOpenWeatherStore } from './open-weather-by-name.redux.store';
import { OpenWeatherActions } from './open-weather-by-name.redux.actions';
import { Unsubscribe } from 'redux';
import { AppStoreService } from './../../app.store';
import { OpenWeatherService } from './../../core/services/open-weather/open-weather.service';
import { IOpenWeatherItem } from './../../core/models/IOpenWeatherItem';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-open-weather-by-name',
  template: `
    <div class="container-fluid" *ngIf="openWeatherStore && openWeatherStore.isInitialized">
      <app-open-weather-current [openWeatherStore]="openWeatherStore"></app-open-weather-current>
      <app-open-weather-history [openWeatherStore]="openWeatherStore"></app-open-weather-history>
    </div>
  ` ,
  styles: [`
    .current-weather, .history-weather {border:0.1em solid #CCC;background-color:white;margin:0 0 1em 0;padding:1.5em 1.5em 1.5em 1.5em;}
    .current-weather h4, .history-weather h4 {font-size:1em;margin:0 0 1em 0;}
    .history-weather blockquote {font-size:1em;}
    .history-item {margin:0 0 1em 0;}
  `],
  encapsulation: ViewEncapsulation.None
})
export class OpenWeatherByNameComponent implements OnInit, OnDestroy {

  public cityIds: number[] = [3871336, 6693229, 3936456, 7521912];
  public openWeatherStore: IOpenWeatherStore;
  public intervalMilliseconds = 3000;
  private _appStoreUnsubscribe: Unsubscribe;
  private _intervalSubscription: NodeJS.Timer;

  constructor(
    private _openWeatherActions: OpenWeatherActions,
    private _appStore: AppStoreService) {

  }

  ngOnInit() {
    this.initSubscription();
    this.getCitiesInfo();
    this.initTimer();
  }

  ngOnDestroy() {
    if (this._appStoreUnsubscribe) {
      this._appStoreUnsubscribe();
    }

    if (this._intervalSubscription) {
      clearInterval(this._intervalSubscription);
    }
  }

  private initSubscription() {
    this._appStoreUnsubscribe = this._appStore.subscribe(() => {
      if (this.openWeatherStore !== this._appStore.getState().OpenWeatherStore) {
        this.openWeatherStore = this._appStore.getState().OpenWeatherStore;
      }
    });
  }

  private getCitiesInfo() {
    this._appStore.dispatch(this._openWeatherActions.getCitiesInfo(this.cityIds));
  }

  private initTimer(): void {
    this._intervalSubscription = setInterval(() => {
      this.getCitiesInfo();
    }, this.intervalMilliseconds);
  }

}
