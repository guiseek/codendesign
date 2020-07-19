import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { CodeFramesModule } from './frames.module';
import { CodeFramesComponent } from './frames.component';

const slides = [
  { headline: '', src: '' }
];

export default {
  title: 'CodeFramesComponent',
  moduleMetadata: {
    imports: [
      CodeFramesModule
    ],
  },
  component: CodeFramesComponent,
  template: `
    <cnd-frames [slides]="slides"> </cnd-frames>
  `,
  props: {
    animationType: text('Label', 'Animação'),
    slideChanged: action('change', {
      allowFunction: true,
    }),
  },
};
