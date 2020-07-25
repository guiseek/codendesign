import { CdkStepperPrevious } from '@angular/cdk/stepper';
import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  selector: 'button[cndStepperPrevious]',
})
export class CodeStepperPrevious extends CdkStepperPrevious {
  @HostBinding('type')
  @Input()
  type: string;
}
