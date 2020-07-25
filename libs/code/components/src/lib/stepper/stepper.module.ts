import { CodeStepComponent } from './step.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CodeStepperComponent } from './stepper.component';
import { CodeStepperPrevious } from './stepper-previous.directive';
import { CodeStepperNext } from './stepper-next.directive';

@NgModule({
  declarations: [
    CodeStepperComponent,
    CodeStepComponent,
    CodeStepperNext,
    CodeStepperPrevious,
  ],
  imports: [CommonModule, CdkStepperModule],
  exports: [
    CodeStepperComponent,
    CdkStepperModule,
    CodeStepComponent,
    CodeStepperNext,
    CodeStepperPrevious,
  ],
})
export class CodeStepperModule {}
