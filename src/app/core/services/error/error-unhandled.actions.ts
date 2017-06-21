import { Injectable } from '@angular/core';
import { Action, ActionCreator } from 'redux';


export const ERRORUNHANDLED_RAISED = 'ERRORUNHANDLED_RAISED';

export interface IErrorUnhandledAction extends Action {
    isRaised: boolean;
};

@Injectable()
export class ErrorUnhandledActions {

    raise: ActionCreator<IErrorUnhandledAction> =
    () => ({
        type: ERRORUNHANDLED_RAISED,
        isRaised: true,
    })

}
