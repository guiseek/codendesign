import { sandboxOf } from 'angular-playground';
import { FramesComponent } from './frames.component';

const slides = [
  { headline: '', src: '' }
];

export default sandboxOf(FramesComponent)
  .add('default', {
    template: `<cnd-frames [slides]="slides"> </cnd-frames>`
  });
