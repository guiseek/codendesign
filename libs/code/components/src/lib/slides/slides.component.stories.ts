import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/angular';
import { text, number, boolean } from '@storybook/addon-knobs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodeSlidesModule } from './slides.module';
import { CodeSlidesComponent } from './slides.component';

const slides = [
  { headline: 'Code 1', src: '/images/slides-1.svg' },
  { headline: 'Code 2', src: '/images/slides-2.svg' },
];

const template = `<cnd-fab [slides]="slides"> </cnd-fab>`;
const moduleMetadata = {
  imports: [BrowserAnimationsModule, CodeSlidesModule],
};
storiesOf('CodeSlides', module)
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

