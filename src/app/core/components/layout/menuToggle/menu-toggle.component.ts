import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-toggle',
  templateUrl: 'menu-toggle.component.html',
  styleUrls: ['menu-toggle.component.css'],
})
export class MenuToggleComponent {

  @Input() isOpen: boolean;
  @Output() onToggle = new EventEmitter<boolean>();

  toggleClick($event: any) {
    this.onToggle.emit(!this.isOpen);
  }

}
