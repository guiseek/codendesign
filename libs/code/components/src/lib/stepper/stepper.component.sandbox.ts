import { sandboxOf } from 'angular-playground';
import { CodeStepperComponent } from './stepper.component';

const slides = [
  { headline: 'Code 1', src: '/images/stepper-1.svg' },
  { headline: 'Code 2', src: '/images/stepper-2.svg' },
];

export default sandboxOf(CodeStepperComponent)
  .add('default', {
    template: `<cnd-stepper [slides]="slides"> </cnd-stepper>`
  });
