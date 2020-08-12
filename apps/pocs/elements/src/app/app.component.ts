import { Component, Input, Output, ɵdetectChanges, EventEmitter } from '@angular/core';
import { App } from './app';

@Component({
  templateUrl: './app.component.html'
})
export class AppComponent {
  @Input() info: App;
  @Input() active: boolean;
  @Output() activeChange = new EventEmitter<boolean>();

  toggle() {
    this.active = !this.active;
    this.activeChange.emit(this.active);
    ɵdetectChanges(this);
  }
}
