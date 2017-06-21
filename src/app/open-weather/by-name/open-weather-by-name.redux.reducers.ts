import { IOpenWeatherHistory } from './../../core/models/IOpenWeatherHistory';
import { IOpenWeatherAction, CITIES_INFO_SET, CITIES_ERROR_SET } from './open-weather-by-name.redux.actions';
import { Injectable, state } from '@angular/core';
import { IOpenWeatherStore } from './open-weather-by-name.redux.store';

@Injectable()
export class OpenWeatherReducersService {

  public static Reducers(state: IOpenWeatherStore = {
    isInitialized: false,
    cities: null,
    error: null,
    history: []
  }, action: any): IOpenWeatherStore {

    const setCities = (actionParam: IOpenWeatherAction) => {
      return {
        isInitialized: true,
        cities: actionParam.cities,
        error: null,
        history: [<IOpenWeatherHistory>{
          date: new Date(),
          cities: actionParam.cities
        }].concat(state.history)
      };
    };

    const setError = (actionParam: IOpenWeatherAction) => {
      return {
        isInitialized: true,
        cities: null,
        error: actionParam.error,
        history: state.history
      };
    };

    switch (action.type) {
      case CITIES_INFO_SET:
        return setCities(action);
      case CITIES_ERROR_SET:
        return setError(action);
      default:
        return state;
    }
  }

};
