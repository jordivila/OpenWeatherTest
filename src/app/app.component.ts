import { CanActivate } from '@angular/router';
import { Component, OnInit, OnDestroy, HostListener, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { AppStoreService } from './app.store';
import { Unsubscribe } from 'redux';
import { ConfigService } from './core/services/config/config.service';

@Component({
  selector: 'app-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {

  public menuIsOpen: boolean;
  public isLoading: boolean;
  public isModalOpen: boolean;
  public isErrorUnhandledOpen: boolean;
  private appStoreUnsubscribe: Unsubscribe;

  constructor(
    private _appStore: AppStoreService,
    private _config: ConfigService,
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {

    this.menuIsOpen = true;
    this.isLoading = false;

    this.appStoreUnsubscribe = this._appStore.subscribe(() => {
      this.stateChanged();
    });

  }

  ngOnDestroy() {
    if (this.appStoreUnsubscribe) {
      this.appStoreUnsubscribe();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth > 992) {
      this.menuIsOpen = true;
    } else {
      this.menuIsOpen = false;
    }
  }

  stateChanged() {
    this.isLoading = this._appStore.getState().LoadingStore.loadingIsOpen;
    // the below line prevents ExpressionChangedAfterItHasBeenCheckedError
    this._changeDetectorRef.detectChanges();
  }

  menuToggleClick(isOpen: boolean) {
    this.menuIsOpen = isOpen;
  }

}
