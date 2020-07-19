import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/angular';
import { text, number, boolean } from '@storybook/addon-knobs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodeFabModule } from './fab.module';
import { CodeFabComponent } from './fab.component';

const slides = [{ headline: '', src: '' }];
const template = `<cnd-fab [slides]="slides"> </cnd-fab>`;
const moduleMetadata = {
  imports: [BrowserAnimationsModule, CodeFabModule],
};
storiesOf('CodeFab', module)
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

