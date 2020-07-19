import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { CodeTableModule } from './table.module';
import { CodeTableComponent } from './table.component';
import { storiesOf } from '@storybook/angular';

storiesOf('Table', module).add('Simple', () => ({
  // component: CodeTableComponent,
  moduleMetadata: {
    imports: [CodeTableModule]
  },
  template: `
      <cnd-table
        class="cnd-table-hover"
        [columns]="displayedColumns"
        [dataSource]="dataSource"
      >

        <ng-container cndColumnDef="id">
          <cnd-header-cell *cndHeaderCellDef> # </cnd-header-cell>
          <cnd-cell *cndCellDef="let element"> {{ element.id }} </cnd-cell>
        </ng-container>

        <ng-container cndColumnDef="name">
          <cnd-header-cell *cndHeaderCellDef> Name </cnd-header-cell>
          <cnd-cell *cndCellDef="let element"> {{ element.name }} </cnd-cell>
        </ng-container>

      </cnd-table>
    `,
  props: {
    displayedColumns: ['id', 'name'],
    dataSource: [
      { id: 1, name: 'Gui'},
      { id: 2, name: 'Gui 2'}
    ]
  },
}));
