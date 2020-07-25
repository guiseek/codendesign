import { sandboxOf } from 'angular-playground';
import { CodeUploadComponent } from './upload.component';

const slides = [
  { headline: 'Code 1', src: '/images/upload-1.svg' },
  { headline: 'Code 2', src: '/images/upload-2.svg' },
];

export default sandboxOf(CodeUploadComponent)
  .add('default', {
    template: `<cnd-upload [slides]="slides"> </cnd-upload>`
  });
