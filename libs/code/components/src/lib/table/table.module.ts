import {
  CodeCell,
  CodeCellDef,
  CodeHeaderCellDef,
  CodeFooterCellDef,
  CodeColumnDef,
  CodeHeaderCell,
  CodeFooterCell,
} from './table-cells';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { CodeTableComponent } from './table.component';
import {
  CodeHeaderRowDef,
  CodeFooterRowDef,
  CodeRowDef,
  CodeHeaderRow,
  CodeFooterRow,
  CodeRow,
} from './table-rows';

export const CODE_DECLARATIONS = [
  CodeCell,
  CodeCellDef,
  CodeColumnDef,
  CodeTableComponent,
  CodeHeaderCell,
  CodeFooterCell,
  CodeHeaderCellDef,
  CodeFooterCellDef,
  CodeHeaderRowDef,
  CodeFooterRowDef,
  CodeRowDef,
  CodeHeaderRow,
  CodeFooterRow,
  CodeRow,
];

@NgModule({
  declarations: CODE_DECLARATIONS,
  imports: [CommonModule, CdkTableModule],
  exports: [CODE_DECLARATIONS, CdkTableModule],
})
export class CodeTableModule {}
