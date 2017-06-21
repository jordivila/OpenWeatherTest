import { environment } from '../../../../environments/environment';

// Feel free to extend this interface
// depending on your app specific config.
export interface EnvConfig {
  production: boolean;
  ENV?: string;
  OWT_APPID: string;
}

export const Config: EnvConfig = environment;
