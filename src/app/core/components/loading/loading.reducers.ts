import { ILoadingAction, LOADING_HIDE, LOADING_SHOW } from './loading.actions';
import { Injectable, state } from '@angular/core';
import { ILoadingStore } from './loading.store';


@Injectable()
export class LoadingReducerService {

    public static Reducers(state: ILoadingStore = {
        loadingIsOpen: false,
        loadingText: '',
        loadingMessagesOpened: 0
    }, action: any): ILoadingStore {

        const show = (actionParam: ILoadingAction) => {
            return {
                loadingIsOpen: true,
                loadingText: actionParam.text,
                loadingMessagesOpened: state.loadingMessagesOpened + 1
            };
        };

        const hide = (actionParam: ILoadingAction) => {
            return {
                loadingIsOpen: ((state.loadingMessagesOpened - 1) > 0),
                loadingText: actionParam.text,
                loadingMessagesOpened: state.loadingMessagesOpened - 1
            };
        };

        switch (action.type) {
            case LOADING_SHOW:
                return show(action);
            case LOADING_HIDE:
                return hide(action);
            default:
                return state;
        }
    }

};
