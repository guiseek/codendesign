import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CodeStepperComponent, CodeStepComponent } from './stepper.component';
import {
  CodeStepperNext,
  CodeStepperPrevious,
} from './stepper-button.directive';

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
