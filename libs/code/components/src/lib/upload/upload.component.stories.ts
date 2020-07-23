import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/angular';
import { text, number, boolean } from '@storybook/addon-knobs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodeUploadModule } from './upload.module';
import { CodeUploadComponent } from './upload.component';

const slides = [
  { headline: 'Code 1', src: '/images/upload-1.svg' },
  { headline: 'Code 2', src: '/images/upload-2.svg' },
];

const template = `<cnd-upload [slides]="slides"> </cnd-upload>`;
const moduleMetadata = {
  imports: [BrowserAnimationsModule, CodeUploadModule],
};
storiesOf('CodeUpload', module)
  .addDecorator(withA11y)
  .add('Simple', () => {
    return {
      moduleMetadata,
      template,
      props: {
        slides,
      },
    };
  });

