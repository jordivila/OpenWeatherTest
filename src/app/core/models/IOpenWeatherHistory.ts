import { IOpenWeatherItem } from './IOpenWeatherItem';

export interface IOpenWeatherHistory {
    date: Date;
    cities: IOpenWeatherItem[];
}
