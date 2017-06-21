import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppStoreService } from './app.store';

describe('App component', () => {

  const config: Route[] = [

  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule.withRoutes(config), CoreModule.forRoot()],
      declarations: [TestComponent, AppComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        AppStoreService,
      ]
    });
  });

  it('should build without a problem',
    () => {
      TestBed
        .compileComponents()
        .then(() => {
          const fixture = TestBed.createComponent(TestComponent);
          const compiled = fixture.nativeElement;

          expect(compiled).toBeTruthy();
        });
    });
});


@Component({
  selector: 'app-test-cmp',
  template: '<app-app></app-app>'
})

class TestComponent {
}
