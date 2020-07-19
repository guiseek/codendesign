import { sandboxOf } from 'angular-playground';
import { CodeFramesComponent } from './frames.component';

const slides = [
  { headline: '', src: '' }
];

export default sandboxOf(CodeFramesComponent)
  .add('default', {
    template: `<cnd-frames [slides]="slides"> </cnd-frames>`
  });
