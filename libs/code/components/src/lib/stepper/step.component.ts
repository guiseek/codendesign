import { CodeStepperComponent } from './stepper.component';
import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Inject, forwardRef } from '@angular/core';
import { CdkStep } from '@angular/cdk/stepper';

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
