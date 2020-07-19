import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { CodeDialogContainer } from './dialog.container';
import { CodeDialogModule } from './dialog.module';

export default {
  title: 'DialogComponent',
  moduleMetadata: {
    imports: [
      CodeDialogModule
    ],
  },
  component: CodeDialogContainer,
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
