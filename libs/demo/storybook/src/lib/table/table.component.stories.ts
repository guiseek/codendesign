import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { TableModule } from './table.module';
import { TableComponent } from './table.component';

export default {
  title: 'TableComponent',
  moduleMetadata: {
    imports: [
      TableModule
    ],
  },
  component: TableComponent,
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
