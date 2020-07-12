import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cnd-storybook-shell',
  template: `<ng-content></ng-content>`,
  styles: [`@import 'https://fonts.googleapis.com/icon?family=Material+Icons';`],
})
export class DemoStorybookShell {
}
