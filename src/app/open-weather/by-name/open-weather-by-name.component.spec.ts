import { IOpenWeatherItem } from './../../core/models/IOpenWeatherItem';
import { Observable } from 'rxjs/Observable';
import { AppStoreService } from './../../app.store';
import { OpenWeatherByNameModule } from './open-weather-by-name.module';
import { CoreModule } from './../../core/core.module';
import { ConfigService, IConfigService } from './../../core/services/config/config.service';
import { OpenWeatherService } from './../../core/services/open-weather/open-weather.service';
import { LoadingService } from './../../core/components/loading/loading.service';
import { OpenWeatherActions } from './open-weather-by-name.redux.actions';
import { OpenWeatherReducersService } from './open-weather-by-name.redux.reducers';
import { OpenWeatherCurrentComponent } from './open-weather-current/open-weather-current.component';
import { OpenWeatherHistoryComponent } from './open-weather-history/open-weather-history.component';
import { ToggleButtonModule } from './../../core/components/toggle-button/toggle-button.module';
import { OpenWeatherByNameRoutingModule } from './open-weather-by-name.routing';
import { CommonModule } from '@angular/common';
import { ViewChild, Component, ReflectiveInjector, Type } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { OpenWeatherByNameComponent } from './open-weather-by-name.component';
import 'rxjs/Rx';
import 'rxjs/add/observable/of';


export function OpenWeatherActionsFactory(loadingService: LoadingService, openWeatherService: OpenWeatherService) {
  return new OpenWeatherActions(loadingService, openWeatherService);
}

describe('OpenWeatherByNameComponent', () => {

  let fixture: ComponentFixture<OpenWeatherByNameComponent>;
  let component: OpenWeatherByNameComponent;

  const getConfig = (): IConfigService => {
    return <IConfigService>{
      production: false,
      API: 'http://someApiUrl/',
      ENV: 'dev',
      LOGIN_PAGE: 'http://someLoginPage/',
      SESSION_LOGOUT_TIMER_MINUTS: 1,
      APP_BASE_HREF: './',
      JVN_COMPANYID: 999,
      USE_FAKEBACKEND: true,
      OWT_APPID: '992873928398293'
    }
  };

  const getOpenWeatherItem = (): IOpenWeatherItem => {
    return {
      'coord': { 'lon': -46.66, 'lat': -23.55 },
      'weather': [{ 'id': 701, 'main': 'Mist', 'description': 'mist', 'icon': '50n' }],
      'base': 'stations',
      'main': { 'temp': 16.4, 'pressure': 1026, 'humidity': 87, 'temp_min': 15, 'temp_max': 18 },
      'visibility': 10000,
      'wind': { 'speed': 4.6, 'deg': 130 },
      'clouds': { 'all': 90 },
      'dt': 1498035600,
      'sys': { 'type': 1, 'id': 4575, 'message': 0.0034, 'country': 'BR', 'sunrise': 1498038484, 'sunset': 1498076947 },
      'id': 7521912,
      'name': 'Consolação',
      'cod': 200
    };
  };

  const getModulTesting = (providers: any[]): typeof TestBed => {

    return TestBed.configureTestingModule({
      imports: [CoreModule.forRoot(), OpenWeatherByNameModule],
      declarations: [],
      providers: providers
    });

  }

  beforeEach(() => {

    getModulTesting([
      { provide: ConfigService, useValue: getConfig() },
      {
        provide: OpenWeatherService, useValue: {
          getById: (userId: string): Observable<IOpenWeatherItem> => Observable.of(getOpenWeatherItem()),
        }
      },
      AppStoreService,
    ]);

    fixture = TestBed.createComponent(OpenWeatherByNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should build without a problem', async(() => {
    expect(component).toBeTruthy();
    component.ngOnDestroy();
  }));

  it('should set each item from the list to current-weather box', fakeAsync(() => {
    component.cityIds = [1, 2, 3, 4, 5, 6];

    component.ngOnInit();
    tick(1000);
    fixture.detectChanges();

    const currentWeatherDomItems = fixture.nativeElement
      .getElementsByTagName(`app-open-weather-current`)[0]
      .getElementsByTagName('app-open-weather-item');

    expect(currentWeatherDomItems.length).toBe(component.cityIds.length);
    component.ngOnDestroy();
    fixture.detectChanges();
  }));

  it('should set error message when an error occurs current-weather box', fakeAsync(() => {

    const dataService = <OpenWeatherService>fixture.debugElement.injector.get(OpenWeatherService);
    const errorText = 'super error';
    dataService.getById = (cityId: number): Observable<IOpenWeatherItem> => Observable.throw(new Error(errorText));

    component.ngOnInit();
    tick(1000);
    fixture.detectChanges();

    const currentWeatherErrors = fixture.nativeElement
      .getElementsByTagName(`app-open-weather-current`)[0]
      .querySelectorAll(`div.has-error`);

    expect(currentWeatherErrors.length).toBe(1);
    expect(currentWeatherErrors[0].innerText).toContain(errorText);

    component.ngOnDestroy();
    fixture.detectChanges();

  }));


  it('should set each item from the list to history box', fakeAsync(() => {
    component.cityIds = [1, 2, 3, 4, 5, 6];

    component.ngOnInit();
    tick(component.intervalMilliseconds + 1);
    fixture.detectChanges();

    let historyWeatherDomItems = fixture.nativeElement
      .getElementsByTagName(`app-open-weather-history`)[0]
      .querySelectorAll('div.history-item');

    // why 2 ? the one that throws ngOnInit + the one that throws the interval
    expect(historyWeatherDomItems.length).toBe(2);

    tick(component.intervalMilliseconds + 1);
    fixture.detectChanges();

    historyWeatherDomItems = fixture.nativeElement
      .getElementsByTagName(`app-open-weather-history`)[0]
      .querySelectorAll('div.history-item');

    expect(historyWeatherDomItems.length).toBe(3);

    component.ngOnDestroy();
    fixture.detectChanges();
  }));




});

// @Component({
//   selector: 'app-test-cmp',
//   template: `<app-open-weather-by-name></app-open-weather-by-name>`
// })
// export class TestComponent {
//   @ViewChild(OpenWeatherByNameComponent) sutAutocomplete: OpenWeatherByNameComponent;
// }
