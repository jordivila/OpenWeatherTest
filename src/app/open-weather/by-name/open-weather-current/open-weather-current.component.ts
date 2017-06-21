import { IOpenWeatherStore } from './../open-weather-by-name.redux.store';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-open-weather-current',
  templateUrl: './open-weather-current.component.html',
  encapsulation: ViewEncapsulation.None
})
export class OpenWeatherCurrentComponent implements OnInit {

  @Input() openWeatherStore: IOpenWeatherStore;

  constructor() { }

  ngOnInit() {
  }

}
