import { OpenWeatherByNameComponent } from './open-weather-by-name.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

const routes = <Route[]>[{
  path: '',
  component: OpenWeatherByNameComponent,
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenWeatherByNameRoutingModule { }
