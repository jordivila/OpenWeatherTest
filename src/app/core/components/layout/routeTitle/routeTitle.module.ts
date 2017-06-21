import { RouteTitleComponent } from './routeTitle.component';
import { Reducer } from 'redux';
import { AppStoreService } from './../../../../app.store';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        RouteTitleComponent
    ],
    exports: [
        RouteTitleComponent
    ],
    providers: [

    ]
})
export class RouteTitleModule {


}
