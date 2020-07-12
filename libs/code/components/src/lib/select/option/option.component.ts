import { Option } from './option.interface';
import { Component, ViewChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'cnd-option',
  template: `
    <ng-template #label>
	    <ng-content></ng-content>
    </ng-template>
  `,
  styles: [
  ]
})
export class OptionComponent implements Option {
  @ViewChild('label') public templateRef: TemplateRef<any>;
	@Input() public value: any;
}
