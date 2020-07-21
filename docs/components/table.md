---
title: table
description: 'blog description'
published: true

---
```typescript
import { Component } from '@angular/core';
import { CodeTableDataSource } from '@cnd/code/components';

export interface PeriodicElement {
  name: string;
  position: number;
  symbol: string;
  weight: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];


@Component({
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  displayedColumns: string[] = ['select','position', 'name', 'weight', 'symbol'];
  dataSource = new CodeTableDataSource(ELEMENT_DATA);
}
```

```html
<cnd-table
  class="cnd-table-hover"
  [columns]="displayedColumns"
  [dataSource]="dataSource"
>

  <ng-container cndColumnDef="position">
    <cnd-header-cell *cndHeaderCellDef> No. </cnd-header-cell>
    <cnd-cell *cndCellDef="let element"> {{ element.position }} </cnd-cell>
  </ng-container>


  <ng-container cndColumnDef="name">
    <cnd-header-cell *cndHeaderCellDef> Name </cnd-header-cell>
    <cnd-cell *cndCellDef="let element"> {{ element.name }} </cnd-cell>
  </ng-container>


  <ng-container cndColumnDef="weight">
    <cnd-header-cell *cndHeaderCellDef> Weight </cnd-header-cell>
    <cnd-cell *cndCellDef="let element"> {{ element.weight }} </cnd-cell>
  </ng-container>


  <ng-container cndColumnDef="symbol">
    <cnd-header-cell *cndHeaderCellDef> Symbol </cnd-header-cell>
    <cnd-cell *cndCellDef="let element"> {{ element.symbol }} </cnd-cell>
  </ng-container>

</cnd-table>
```
