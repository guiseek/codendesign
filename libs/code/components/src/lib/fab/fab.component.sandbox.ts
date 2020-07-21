import { sandboxOf } from 'angular-playground';
import { CodeFabComponent } from './fab.component';

const slides = [
  { headline: '', src: '' }
];

export default sandboxOf(CodeFabComponent)
  .add('default', {
    template: `<cnd-fab [slides]="slides"> </cnd-fab>`
  });
