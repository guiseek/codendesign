import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { CodeTableModule } from './table.module';
import { CodeTableComponent } from './table.component';

export default {
  title: 'TableComponent',
  moduleMetadata: {
    imports: [
      CodeTableModule
    ],
  },
  component: CodeTableComponent,
  template: `
    <cnd-table>

    </cnd-table>
  `,
  props: {
    label: text('Label', 'Nome'),
    onChange: action('change', {
      allowFunction: true,
    }),
  },
};
