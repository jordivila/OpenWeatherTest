import { AppStoreService } from './../../../app.store';
import { ErrorHandlerService } from 'app/core/services/error/error-unhandled.service';
import { ErrorUnhandledReducerService } from './error-unhandled.reducers';
import { ErrorUnhandledActions } from './error-unhandled.actions';
import { NgModule, ModuleWithProviders, Optional, SkipSelf, ErrorHandler, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from 'app/core/components/module-import-guard';


@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [

    ],
    exports: [

    ],
})
export class ErrorUnhandledModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ErrorUnhandledModule,
            providers: [
                ErrorUnhandledReducerService,
                ErrorUnhandledActions,
                {
                    provide: ErrorHandler,
                    useClass: ErrorHandlerService,
                    deps: [AppStoreService, ErrorUnhandledActions, Injector]
                }
            ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ErrorUnhandledModule) {
        throwIfAlreadyLoaded(parentModule, 'ErrorUnhandledModule');
    }
}
