import { RouteTitleModule } from './routeTitle/routeTitle.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { RouteTitleComponent } from './routeTitle/routeTitle.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuToggleComponent } from './menuToggle/menu-toggle.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        RouteTitleModule,
    ],
    declarations: [
        ToolbarComponent,
        MenuToggleComponent,
        NavbarComponent,
        FooterComponent,
    ],
    exports: [
        RouteTitleModule,
        ToolbarComponent,
        MenuToggleComponent,
        NavbarComponent,
        FooterComponent,
    ],
})
export class LayoutModule { }
