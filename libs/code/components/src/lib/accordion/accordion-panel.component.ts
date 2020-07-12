import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { CdkAccordionItem } from '@angular/cdk/accordion';

@Component({
  selector: 'cnd-accordion-panel',
  templateUrl: './accordion-panel.component.html',
  styleUrls: ['./accordion-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('bodyExpansion', [
      state('false', style({ height: '0px', visibility: 'hidden' })),
      state('true', style({ height: '*', visibility: 'visible' })),
      transition('true <=> false', animate('300ms ease-in-out')),
    ]),
    trigger('indicatorRotate', [
      state('false', style({ transform: 'rotate(0deg)' })),
      state('true', style({ transform: 'rotate(180deg)' })),
      transition('true <=> false', animate('300ms ease-in-out')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionPanelComponent extends CdkAccordionItem {
  @Input() expanded: boolean;
}
