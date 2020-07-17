import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { DialogModule, DialogComponent } from '@cnd/code/components';

export default {
  title: 'DialogComponent',
  moduleMetadata: {
    imports: [
      DialogModule
    ],
  },
  component: DialogComponent,
  template: `
    <cnd-dialog>

    </cnd-dialog>
  `,
  props: {
    label: text('Label', 'Nome'),
    onChange: action('change', {
      allowFunction: true,
    }),
  },
};
