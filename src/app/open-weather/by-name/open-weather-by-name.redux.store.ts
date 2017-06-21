import { IOpenWeatherItem } from './../../core/models/IOpenWeatherItem';
import { IOpenWeatherHistory } from './../../core/models/IOpenWeatherHistory';

export interface IOpenWeatherStore {
    isInitialized: boolean;
    cities?: IOpenWeatherItem[];
    history: IOpenWeatherHistory[];
    error?: any;
}
