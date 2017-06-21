import { OpenWeatherService } from './../../core/services/open-weather/open-weather.service';
import { IOpenWeatherItem } from './../../core/models/IOpenWeatherItem';
import { LoadingService } from './../../core/components/loading/loading.service';
import { Injectable } from '@angular/core';
import { Action, ActionCreator } from 'redux';
import { Subscription } from 'rxjs/Subscription';
import { IOpenWeatherStore } from './open-weather-by-name.redux.store';

export const CITIES_INFO_SET = 'CITIES_INFO_SET';
export const CITIES_ERROR_SET = 'CITIES_ERROR_SET';

export interface IOpenWeatherAction extends Action {
    cities?: IOpenWeatherItem[];
    error?: string;
};


type IGetState<S> = () => S;

@Injectable()
export class OpenWeatherActions {

    constructor(
        private _loadingService: LoadingService,
        private _openWeatherService: OpenWeatherService) {

    }

    getCitiesInfo = (cityIds: number[]) => {

        return (dispatch: any, getState: IGetState<IOpenWeatherStore>) => {

            this._loadingService.show('Retrieving weather data');

            const httpRequests = cityIds.map((cityId: number) => {
                return this._openWeatherService.getById(cityId).toPromise();
            });

            Promise.all(httpRequests)
                .then((data: IOpenWeatherItem[]) => {
                    dispatch(this.setInfo(data));
                    this._loadingService.hide();
                })
                .catch((reason: any) => {
                    dispatch(this.setError(reason));
                    this._loadingService.hide();
                });
        };
    }


    setInfo: ActionCreator<IOpenWeatherAction> =
    (data: IOpenWeatherItem[]) => ({
        type: CITIES_INFO_SET,
        cities: data
    })

    setError: ActionCreator<IOpenWeatherAction> =
    (error: string) => ({
        type: CITIES_ERROR_SET,
        error: error
    })
}
