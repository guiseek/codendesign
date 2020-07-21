import { sandboxOf } from 'angular-playground';
import { CodeSlidesComponent } from './slides.component';

const slides = [
  { headline: 'Code 1', src: '/images/slides-1.svg' },
  { headline: 'Code 2', src: '/images/slides-2.svg' },
];

export default sandboxOf(CodeSlidesComponent)
  .add('default', {
    template: `<cnd-slides [slides]="slides"> </cnd-slides>`
  });
