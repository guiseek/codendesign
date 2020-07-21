import {
  Input,
  Output,
  EventEmitter,
  Component,
  ChangeDetectionStrategy,
  AfterContentInit,
  ContentChildren,
  QueryList,
  ViewEncapsulation,
  Inject,
  forwardRef,
} from '@angular/core';
import { CdkStepper, CdkStep } from '@angular/cdk/stepper';
import { Stepper } from './stepper.interface';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'cnd-step',
  templateUrl: './step.component.html',
  providers: [{ provide: CdkStep, useExisting: CodeStepComponent }],
  exportAs: 'cndStep',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeStepComponent extends CdkStep {
  constructor(
    @Inject(forwardRef(() => CodeStepperComponent))
    stepper: CodeStepperComponent
  ) {
    super(stepper);
  }
}

@Component({
  selector: 'cnd-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: CdkStepper, useExisting: CodeStepperComponent }],
  exportAs: 'cndStepper'
})
export class CodeStepperComponent extends CdkStepper implements AfterContentInit {
  @Input() controls = true;

  @ContentChildren(CodeStepComponent, { descendants: true })
  _steps: QueryList<CodeStepComponent>;

  @Output() stepChanged = new EventEmitter<Stepper>();

  ngAfterContentInit() {
    console.log('this._steps: ', this._steps);
    this._steps.changes.pipe(takeUntil(this._destroyed)).subscribe(() => {
      this._stateChanged();
    });
  }

  onClick(index: number): void {
    this.selectedIndex = index;
  }
}
