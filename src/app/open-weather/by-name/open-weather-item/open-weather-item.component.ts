import { IOpenWeatherItem } from './../../../core/models/IOpenWeatherItem';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-open-weather-item',
  template: `<div>{{item.sys.country}} - {{item.name}} - Temp.: {{item.main.temp}}</div>`,
  encapsulation: ViewEncapsulation.None
})
export class OpenWeatherItemComponent implements OnInit {

  @Input() item: IOpenWeatherItem;

  constructor() { }

  ngOnInit() {

  }

}
