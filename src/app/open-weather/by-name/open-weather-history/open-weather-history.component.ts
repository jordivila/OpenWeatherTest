import { IOpenWeatherStore } from './../open-weather-by-name.redux.store';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-open-weather-history',
  templateUrl: './open-weather-history.component.html',
  encapsulation: ViewEncapsulation.None
})
export class OpenWeatherHistoryComponent implements OnInit {

  @Input() openWeatherStore: IOpenWeatherStore;
  public isHistoryVisible: boolean;

  constructor() { }

  ngOnInit() {
    this.isHistoryVisible = true;
  }

  historyToggle() {
    this.isHistoryVisible = !this.isHistoryVisible;
  }

}
