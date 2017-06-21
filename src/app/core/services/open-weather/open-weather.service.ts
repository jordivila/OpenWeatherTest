import { IOpenWeatherItem } from './../../models/IOpenWeatherItem';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../../../core/services/config/config.service';

@Injectable()
export class OpenWeatherService {

    private _baseApiUri: string;

    constructor(
        private _http: Http,
        private _configService: ConfigService) {

        this._baseApiUri = 'http://api.openweathermap.org/data/2.5/';
    }

    getByName(cityName: string): Observable<IOpenWeatherItem> {

        return this.
            _http
            .get(`${this._baseApiUri}weather?q=$${cityName}&appid=${this._configService.OWT_APPID}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error));
    }

    getById(cityId: number): Observable<IOpenWeatherItem> {

        return this.
            _http
            .get(`${this._baseApiUri}weather?id=${cityId}&appid=${this._configService.OWT_APPID}&units=metric`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error));
    }

}
