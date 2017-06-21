import { AppRoutes, APP_OWT_BY_NAME } from './../../../../app-routing';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Config } from './../../../services/config/env.config';
import { ConfigService } from './../../../services/config/config.service';
import { IRouteDataCustomized } from './../../../services/routing/route-data-customized';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event, ActivatedRoute, NavigationStart } from '@angular/router';
import { RouteDataCustomized } from '../../../services/routing/route-data-customized';
import { INavbarItem, INavbarArea } from './navbar.dto';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
})

export class NavbarComponent implements OnInit, OnDestroy {

  public items: INavbarItem[] = [];
  private routerEventsSubscription: Subscription;
  private navbarAreas: INavbarArea[];

  constructor(
    private router: Router,
    private configService: ConfigService,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.InitNavbarMenu();
  }

  ngOnDestroy() {
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe();
    }
  }


  private InitNavbarMenu() {
    this.router.resetConfig(AppRoutes);

    this.router.config.forEach((routeItem) => {
      if (routeItem.data) {
        if ((<IRouteDataCustomized>routeItem.data).isMenuItem) {
          this.items.push(
            {
              title: routeItem.data['title'],
              icon: routeItem.data['icon'],
              action: routeItem.path,
              selected: routeItem.path === APP_OWT_BY_NAME.path
            });
        }
      }
    });
  }


}
