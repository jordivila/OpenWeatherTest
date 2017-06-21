import { NgModule, ModuleWithProviders, Optional, SkipSelf, enableProdMode } from '@angular/core';
import { PreloadAllModules, NoPreloading, Routes, RouterModule, provideRoutes } from '@angular/router';

import { environment } from './../environments/environment';
import { Route, CanActivate } from '@angular/router';
import { IRouteDataCustomized } from './core/services/routing/route-data-customized';

export const APP_OWT_BY_NAME: Route = {
    path: 'open-weather/by-name',
    loadChildren: 'app/open-weather/by-name/open-weather-by-name.module#OpenWeatherByNameModule',
    data: <IRouteDataCustomized>{
        icon: 'globe',
        title: 'By city name',
        isMenuItem: true
    },
};

export const AppRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: APP_OWT_BY_NAME.path },
    APP_OWT_BY_NAME,
    {
        path: '404',
        loadChildren: 'app/notFound/not-found.module#NotFoundModule',
        data: <IRouteDataCustomized>{
            icon: '',
            title: 'Not Found',
            isMenuItem: !environment.production
        }
    },
    {
        path: '**',
        redirectTo: '/404'
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(AppRoutes, { useHash: true, preloadingStrategy: NoPreloading, enableTracing: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
