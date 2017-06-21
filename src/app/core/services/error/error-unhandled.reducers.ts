import { ERRORUNHANDLED_RAISED, IErrorUnhandledAction } from './error-unhandled.actions';
import { Injectable } from '@angular/core';
import { IErrorUnhandledStore } from './error-unhandled.store';


@Injectable()
export class ErrorUnhandledReducerService {

    public static Reducers(state: IErrorUnhandledStore = {
        isRaised: false,
    }, action: any): IErrorUnhandledStore {

        const raise = (actionParam: IErrorUnhandledAction) => {
            return {
                isRaised: true,
            };
        };

        switch (action.type) {
            case ERRORUNHANDLED_RAISED:
                return raise(action);
            default:
                return state;
        }
    }
};
