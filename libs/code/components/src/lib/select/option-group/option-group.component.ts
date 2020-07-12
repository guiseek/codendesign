import { OptionComponent } from './../option/option.component';
import {
  Component,
  ContentChildren,
  QueryList,
  Input,
} from '@angular/core';

@Component({
  selector: 'cnd-option-group',
  template: ``,
  styles: [],
})
export class OptionGroupComponent {
  @ContentChildren(OptionComponent) public options: QueryList<OptionComponent>;

  @Input() public label: string;
}
