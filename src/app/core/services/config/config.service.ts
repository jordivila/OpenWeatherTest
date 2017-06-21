import { Config, EnvConfig } from './env.config';
import { Injectable, Inject } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

export interface IConfigService extends EnvConfig {
    APP_BASE_HREF?: string;
}

@Injectable()
export class ConfigService implements IConfigService {

    readonly ENV?: string = Config.ENV;
    readonly APP_BASE_HREF?: string;
    readonly production: boolean = Config.production;
    readonly OWT_APPID: string = Config.OWT_APPID;

    constructor( @Inject(APP_BASE_HREF) APP_BASE_HREF: any) {
        this.APP_BASE_HREF = APP_BASE_HREF;
    }

}
