import { provideRoutes } from '@angular/router';
import { AppStoreService } from './../../../app.store';
import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingReducerService } from './loading.reducers';
import { LoadingComponentActions } from './loading.actions';
import { LoadingComponent } from './loading.component';
import { LoadingService } from './loading.service';

export function LoadingServiceFactory(appStoreService: AppStoreService, loadingActions: LoadingComponentActions) {
    return new LoadingService(appStoreService, loadingActions);
}


@NgModule({
    imports: [CommonModule],
    declarations: [LoadingComponent],
    exports: [LoadingComponent],
    providers: [
        LoadingReducerService,
        LoadingComponentActions,
        {
            provide: LoadingService,
            useFactory: LoadingServiceFactory,
            deps: [AppStoreService, LoadingComponentActions]
        }
    ]
})
export class LoadingModule {

    constructor(appStore: AppStoreService) {
        appStore.addReducers({ LoadingStore: LoadingReducerService.Reducers });
    }

}
