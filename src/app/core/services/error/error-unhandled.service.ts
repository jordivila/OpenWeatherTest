import { AppStoreService } from './../../../app.store';
import { ErrorHandler, Injectable, Injector, ApplicationRef } from '@angular/core';
import { ErrorUnhandledActions } from './error-unhandled.actions';

@Injectable()
export class ErrorHandlerService extends ErrorHandler {

    constructor(
        private appStore: AppStoreService,
        private errUnhadledActions: ErrorUnhandledActions,
        private injector: Injector) {

        super(false);
    }

    handleError(error: Error) {
        console.group('Unhandled error !!! :O');
        console.log(this.appStore.getState());
        console.log(error);
        console.groupEnd();

        this.appStore.dispatch(this.errUnhadledActions.raise());

        const message = `The application has encountered an unknown error.
                        Our technical staff has been automatically notified and will be looking into this with the utmost urgency.`;
        const title = 'Unhandled error';
        const options = { dismiss: 'click', };
        const doneFn = () => {
            window.location.reload(true);
        };

    }
}
