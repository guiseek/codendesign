import { CdkStepperNext, CdkStepperPrevious } from '@angular/cdk/stepper';
import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  selector: 'button[cndStepperNext]',
})
export class CodeStepperNext extends CdkStepperNext {
  @HostBinding('type')
  @Input()
  type: string;
}

@Directive({
  selector: 'button[cndStepperPrevious]',
})
export class CodeStepperPrevious extends CdkStepperPrevious {
  @HostBinding('type')
  @Input()
  type: string;
}
