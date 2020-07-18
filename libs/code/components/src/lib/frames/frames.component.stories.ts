import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { FramesModule } from './frames.module';
import { FramesComponent } from './frames.component';

const slides = [
  { headline: '', src: '' }
];

export default {
  title: 'FramesComponent',
  moduleMetadata: {
    imports: [
      FramesModule
    ],
  },
  component: FramesComponent,
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
