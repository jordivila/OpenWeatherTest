import { Component, OnInit, ViewChild, EventEmitter, Output, HostListener, Input, ViewEncapsulation, ElementRef } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.css']
})
export class ToggleButtonComponent implements OnInit {

  @Input() isOpen: boolean;
  @Output() onToggle = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    if (!this.isOpen) { this.isOpen = false; }
  }

  toggleIt() {
    this.isOpen = !this.isOpen;
    this.onToggle.emit(this.isOpen);
  }

}
