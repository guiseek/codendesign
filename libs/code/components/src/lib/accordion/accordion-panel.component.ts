import { Subject } from 'rxjs';
import { AccordionButtonDirective } from './accordion-button.directive';
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ContentChild,
  AfterViewInit,
  Output,
  EventEmitter,
  OnDestroy,
  AfterContentInit,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { takeUntil } from 'rxjs/operators';

let NEXT_ID = 0;

@Component({
  selector: '[cnd-accordion-panel], cnd-accordion-panel',
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
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AccordionPanelComponent
  implements AfterContentInit, AfterViewInit, OnDestroy {
  public id = `sect${NEXT_ID++}`;
  public labelledby = `accordion${this.id}id`;

  @Input() expanded: boolean;
  @ContentChild(AccordionButtonDirective)
  public button: AccordionButtonDirective;

  destroy$ = new Subject<void>();
  @Output() expandedChange = new EventEmitter<boolean>();

  ngAfterContentInit() {
    if (this.button) {
      this.button.controls = this.id;
      this.button.id = this.labelledby;
    }
  }

  ngAfterViewInit() {
    this.button.expandedChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.expandedChange);
  }

  ngOnDestroy() {
    this.destroy$.complete();
  }
}
